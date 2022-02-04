import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PageNotFound from '../PageNotFound'
import { AgentAttributeSkeleton, SearchSkeleton } from '../LoadingSkeleton'
import TileList from '../Tile'
import AgentAttributeList from '../AgentAttribute'
import '../Button/styles.scss'
import { appendParams, firePageViewEvent } from '../Helpers'
import './styles.scss'

const AgentDescription = ({ attributes }) => (
  attributes.length ?
  (<div className='agent__description'>
    <h2 className='agent__section-title'>Summary</h2>
    <AgentAttributeList items={attributes} />
  </div>) : (null)
)

const AgentRelatedCollections = ({ agentTitle, collections, params }) => (
  collections.length ?
  (<div className='agent__related'>
    <h2 className='agent__section-title'>Related Collections</h2>
    <TileList hideHitCount items={collections} params={params} />
    { collections.length === 8 ?
      (<a href={`/search?query=${agentTitle}&category=collection`} className='btn btn--search-more'>Search More Related Collections</a>) :
      (null)
    }
  </div>) : (null)
)

const AgentSidebar = ({ agentType, externalIdentifiers }) => {
  const linkList = externalIdentifiers.map(i =>  (
    <li key={i.url}>
      <a className='btn--agent-identifier' href={i.url}>{i.title}</a>
    </li>))
  return (
  externalIdentifiers.length ?
  (<div className='agent__sidebar'>
    <h2 className='agent__section-title'>More about this {agentType}</h2>
    <ul className='unstyled'>{linkList}</ul>
  </div>) : (null)
)}

const PageAgent = () => {

  const [externalIdentifiers, setExternalIdentifiers] = useState([])
  const [found, setFound] = useState(true)
  const [isAgentLoading, setIsAgentLoading] = useState(true)
  const [isAttributesLoading, setIsAttributesLoading] = useState(true)
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true)
  const [agent, setAgent] = useState({})
  const [collections, setCollections] = useState([])
  const [attributes, setAttributes] = useState([])
  const [wikidata, setWikidata] = useState({})
  const [params, setParams] = useState({})
  const { id } = useParams()
  const { search } = useLocation()

  /** Fetches data about collections associated with the agent */
  const fetchCollections = ({ title }) => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search?query=${title}&category=collection&limit=8`)
      .then(res => {
        setCollections(res.data.results);
        setIsCollectionsLoading(false);
      })
      .catch(err => console.log(err))
  }

  const fetchWikidata = ({ external_identifiers }) => {
    const wikidataId = external_identifiers.find(i => i.source == 'wikidata') && external_identifiers.find(i => i.source == 'wikidata').identifier
    if (wikidataId) {
      axios
        .get(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`)
        .then(res => setWikidata(res.data.entities[wikidataId]))
        .catch(err => console.log(err))
    }
  }

  /** Adds labels for agent attributes */
  const parseAgentAttributes = ( agent ) => {
    const agentType = agent.agent_type
    const startDates = agent.dates ? agent.dates.map(date => (
      {label: agentType === 'organization' ? 'Date Established' : 'Date of Birth', value: date.begin, note: false}
    )) : []
    const endDates = agent.dates ? agent.dates.map(date => (
      {label: agentType === 'organization' ? 'Date Disbanded' : 'Date of Death', value: date.end, note: false}
    )) : []
    const noteText = agent.notes ? agent.notes.map(note => (
      {label: 'Description', value: note.subnotes.map(s => s.content).join('\r\n'), note: true}
    )) : []
    setAttributes(startDates.concat(endDates).concat(noteText))
    setIsAttributesLoading(false)
  }

  /** Fetches agent data on initial page load */
  useEffect(() => {
    const initialParams = queryString.parse(search, { parseBooleans: true });
    setParams(initialParams)
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/agents/${id}`)
      .then(res => {
        setAgent(res.data);
        fetchCollections(res.data);
        fetchWikidata(res.data);
        parseAgentAttributes(res.data);
        setIsAgentLoading(false)
      })
      .catch(err => setFound(false))
  }, [])

  /** Parse and set external identifiers found in Wikidata */
  useEffect(() => {
    if (!!Object.keys(wikidata).length) {
      const desiredIdentifiers = [
        { property: 'P214', title: 'Virtual International Authority File', prefix: 'https://viaf.org/viaf'} ,
        { property: 'P7859', title: 'WorldCat Identities', prefix: 'https://www.worldcat.org/identities' },
        { property: 'P3430', title: 'Social Networks and Archival Context', prefix: 'https://snaccooperative.org/ark:' }]
      const availableIdentifiers = desiredIdentifiers.filter(c => Object.keys(wikidata.claims).includes(c.property))
      const parsedIdentifiers = availableIdentifiers.map(c => {
        const identifierValue = wikidata.claims[c.property][0].mainsnak.datavalue.value
        return {title: c.title, url: `${c.prefix}/${identifierValue}`}
      })
      let wikiIdentifiers = [{ title: 'Wikidata', url: `https://wikidata.org/wiki/${wikidata.title }`}]
      wikidata.sitelinks.enwiki && wikiIdentifiers.unshift({ title: 'Wikipedia', url: wikidata.sitelinks.enwiki.url })
      setExternalIdentifiers(wikiIdentifiers.concat(parsedIdentifiers))
    }
  }, [wikidata])

  /** Parse and set agent attributes from Wikidata */
  useEffect(() => {
    if (!!Object.keys(wikidata).length) {
      const desiredProperties = [
        { property: 'P106', label: 'Occupations' },
        { property: 'P39', label: 'Positions Held' },
        { property: 'P19', label: 'Place of Birth' }
      ]
      const availableProperties = desiredProperties.filter(p => Object.keys(wikidata.claims).includes(p.property))
      availableProperties.map(p => {
        const values = Promise.all(
          wikidata.claims[p.property].map(c => {
            const identifierValue = c.mainsnak.datavalue.value.id
            if (identifierValue.startsWith('Q')) { // TODO: we should probably check a type here
              return axios
                .get(`https://www.wikidata.org/wiki/Special:EntityData/${identifierValue}.json`)
                .then(res => {
                  return res.data.entities[identifierValue].aliases.en && res.data.entities[identifierValue].aliases.en[0].value
                })
            }
          })
        ).then(v => {
          const noteIndex = attributes.findIndex(a => a.note == true)
          attributes.splice(noteIndex, 0, {label: p.label, value: v.filter(e => e != null).join(', '), note: false})
          setAttributes(attributes)
        })
      })
    }
  }, [wikidata])

  if (!found) {
    return (<PageNotFound />)
  }
  return (
    <React.Fragment>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ agent.title }</title>
      </Helmet>
      <div className='container--full-width'>
        <div className='agent__wrapper'>
          <nav className="agent__nav">
            <a href={appendParams('/search', params)} className='btn btn--back'>
              <span className='material-icons'>keyboard_arrow_left</span>Back to Search
            </a>
          </nav>
          <main id='main' role='main'>
            <div className='agent__wrapper--description'>
              <div className='agent__main'>
                <h1 className='agent__title'>{ agent.title || <Skeleton />}</h1>
                {isAttributesLoading ?
                  (<AgentAttributeSkeleton />) :
                  (<AgentDescription attributes={attributes} />)}
                {isCollectionsLoading ?
                  (<SearchSkeleton />) :
                  (<AgentRelatedCollections
                    agentTitle={agent.title}
                    collections={collections}
                    params={{...params, category: ''}} />) }
                </div>
              <AgentSidebar agentType={agent.agent_type} externalIdentifiers={externalIdentifiers} />
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PageAgent;
