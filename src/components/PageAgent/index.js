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

const AgentSidebar = ({ agents }) => (
  agents ?
  (<div className='agent__sidebar'>
    <h2 className='agent__section-title'>Related People and Organizations</h2>
    <TileList hideHitCount items={agents} />
  </div>) : (null)
)

const PageAgent = () => {

  const [found, setFound] = useState(true)
  const [isAgentLoading, setIsAgentLoading] = useState(true)
  const [isAttributesLoading, setIsAttributesLoading] = useState(true)
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true)
  const [agent, setAgent] = useState({})
  const [collections, setCollections] = useState([])
  const [attributes, setAttributes] = useState([])
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
        parseAgentAttributes(res.data);
        setIsAgentLoading(false)
      })
      .catch(err => setFound(false))
  }, [])

  if (!found) {
    return (<PageNotFound />)
  }
  return (
    <React.Fragment>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ agent.title }</title>
      </Helmet>
      <div className='container agent'>
        <nav className="agent__nav">
          <a href={appendParams('/search', params)} className='btn btn--back'>
            <span className='material-icons'>keyboard_arrow_left</span>Back to Search
          </a>
        </nav>
        <main id='main' role='main'>
          <h1 className='agent__title'>{ agent.title || <Skeleton />}</h1>
          <p className='agent__subtitle'>{ isAgentLoading ?
            (<Skeleton />) :
            (agent.description) }
          </p>
          {isAttributesLoading ?
            (<AgentAttributeSkeleton />) :
            (<AgentDescription attributes={attributes} />)}
          {isCollectionsLoading ?
            (<SearchSkeleton />) :
            (<AgentRelatedCollections
              agentTitle={agent.title}
              collections={collections}
              params={{...params, category: ''}} />) }
        </main>
        <AgentSidebar related={agent.agents} />
      </div>
    </React.Fragment>
  )
}

export default PageAgent;
