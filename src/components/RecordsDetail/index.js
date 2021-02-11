import React, { useEffect, useState } from 'react'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from '../Accordion'
import ListToggleButton from '../ListToggleButton'
import MaterialIcon from '../MaterialIcon'
import QueryHighlighter from '../QueryHighlighter'
import { DetailSkeleton, FoundInItemSkeleton } from '../LoadingSkeleton'
import { appendParams, dateString, hasAccessOrUse, noteText, noteTextByType } from '../Helpers'
import { isItemSaved } from '../MyListHelpers'
import classnames from 'classnames'
import './styles.scss'

const FoundInItem = ({ className, item, params, topLevel }) => (
  <>
    <li className={className}>
      <MaterialIcon icon={topLevel ? 'archive_box' : 'subdirectory_arrow_right'} />
      <a className='found-in__link' href={appendParams(item.uri, params)}>{item.title}</a>
    </li>
    {item.child ?
      (<FoundInItem
        item={item.child}
        className='found-in__subcollection'
        params={params} />) :
      (null)}
  </>
)

const PanelExtentSection = ({ extents }) => (
  extents ? (
  <div className='panel__section'>
    <h3 className='panel__heading'>Size</h3>
    <ul className='panel__list--unstyled'>
      {extents.map((e, index) => {
        const extentArray = e.type.replace('_', ' ').split(' ').map((ext, i, arr) => (
          arr.length - 1 === i ? pluralize(ext, e.value) : ext
        ))
        return (
      <li key={index} className='panel__text'>{`${e.value} ${extentArray.join(' ')}`}</li>)})}
    </ul>
  </div>) :
  (null)
)

const PanelFormatSection = ({ formats, notes }) => {
  const displayFormats = formats.filter(f => f !== 'documents')
  var formatText = []
  formatText.push(noteTextByType(notes, "physdesc"))
  formatText.push(noteTextByType(notes, "materialspec"))
  const filteredFormatText = formatText.filter(i => i != null).filter(i => i !== '')
  return (
    displayFormats.length ? (
      <div className='panel__section'>
        <h3 className='panel__heading'>Formats</h3>
        <ul className='panel__list--unstyled'>
          {filteredFormatText.length ?
            (<li className='panel__text'>{filteredFormatText.join('\n')}</li>) :
            (displayFormats.map((format, index) => (
              <li key={index} className='panel__text'>{format}</li>))
            )
          }
        </ul>
      </div>) :
    (null)
  )
}

const PanelFoundInSection = ({ ancestors, isItemLoading, params }) => (
  ancestors.title ?
    (<div className='panel__section'>
      <h3 className='panel__heading'>Found In</h3>
      <ul className='found-in'>
      {isItemLoading ?
        (<FoundInItemSkeleton/>) :
        (<FoundInItem
            item={ancestors}
            className='found-in__collection'
            params={params}
            topLevel={true} />)}
      </ul>
    </div>) :
    (null)
)

const PanelLinkedListSection = ({ listData, params, title }) =>  (
  listData ?
    (<div className='panel__section'>
      <h3 className='panel__heading'>{title}</h3>
      <ul className='panel__list--unstyled'>
        {listData.map((item, index) => (
        <li key={index} className='panel__text'><a href={appendParams(item.uri, params)}>{item.title}</a></li>))}
      </ul>
    </div>) :
    (null)
)

const PanelListSection = ({ listData, title }) =>  (
  listData ?
    (<div className='panel__section'>
      <h3 className='panel__heading'>{title}</h3>
      <ul className='panel__list--unstyled'>
        {listData.map((item, index) => (
        <li key={index} className='panel__text'>{item.title}</li>))}
      </ul>
    </div>) :
    (null)
)

const PanelTextSection = ({ params, text, title }) => {
  const parsedQuery = params && params.query ? (params.query) : ('')
  return (
  text ?
    (<div className='panel__section'>
      <h3 className='panel__heading'>{title}</h3>
      <p className='panel__text--narrative'>
        <QueryHighlighter query={parsedQuery} text={text} />
      </p>
    </div>) :
    (null)
)}

const RecordsDetail = props => {

  var [isSaved, setIsSaved] = useState(() => {
    return !props.isItemLoading && isItemSaved(props.item)
  })

  /** Set isSaved in state after item finishes loading */
  useEffect(() => {
    const saved = !props.isItemLoading && isItemSaved(props.item)
    setIsSaved(saved)
  }, [props.isItemLoading, props.item, props.myListCount])

  /** Constructs the URL for the 'Back to Search' button */
  const searchUrl = (
    props.params && props.params.query ? appendParams('/search', props.params) : '/'
  )

  /** Parses an item's identifier from its URI */
  const identifier = (
    props.item.uri && props.item.uri.split('/')[props.item.uri.split('/').length - 1]
  )

  return (
  <div className={classnames('records__detail', {'hidden': props.isContentShown})}>
    <nav>
      <a href={searchUrl} className='btn btn--back'>
        <MaterialIcon icon='keyboard_arrow_left'/>Back to Search
      </a>
    </nav>
    <h1 className='records__title'>{props.isItemLoading ? <Skeleton /> : props.item.title }</h1>
    {props.item.type === 'object' &&
      <>
      <ListToggleButton
        className='btn-add--detail'
        isSaved={isSaved}
        item={props.item}
        toggleSaved={props.toggleInList} />
        {props.item.online &&
          <>
          <a className='btn btn-launch--detail'
            href={`${props.item.uri}/view`}>View Online <MaterialIcon icon='visibility' /></a>
          <a className='btn btn-download--detail'
            href={`${process.env.REACT_APP_S3_BASEURL}/pdfs/${identifier}`}
            target='_blank'
            title='opens in a new window'
            rel='noopener noreferrer'
            >Download <MaterialIcon icon='get_app' /></a>
            { props.downloadSize ?
              <p className='panel__text'>{`Acrobat PDF, ${props.downloadSize}`}</p> :
              <p className='panel__text'><Skeleton/></p> }
          </>
        }
      </>
    }
    <Accordion className='accordion accordion--details' preExpanded={['summary']} allowZeroExpanded={true}>
      <AccordionItem className='accordion__item' uuid='summary'>
        <AccordionItemHeading ariaLevel={2}>
          <AccordionItemButton className='accordion__button'>Summary</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className='accordion__panel'>
          {props.isItemLoading ?
            (<DetailSkeleton />) :
            (<>
              <div className='panel__section--flex'>
                <PanelLinkedListSection
                  title='Creators'
                  params={props.params}
                  listData={props.item.creators} />
                <PanelTextSection
                  title='Dates'
                  text={dateString(props.item.dates)} />
                <PanelExtentSection
                  extents={props.item.extents} />
                <PanelFormatSection
                  formats={props.item.formats}
                  notes={props.item.notes} />
              </div>
              <PanelFoundInSection
                ancestors={props.ancestors}
                isItemLoading={props.isAncestorsLoading}
                params={props.params} />
              <PanelTextSection
                params={props.params}
                title='Description'
                text={props.item.description} />
              { props.item.notes && props.item.notes.filter(n => n.type === 'odd').map(n => (
                <PanelTextSection
                params={props.params}
                title={n.title}
                text={noteText(n)}
                />
              ))}
              { noteTextByType(props.item.notes, 'processinfo') ?
                (<PanelTextSection
                  params={props.params}
                  title='Processing Information'
                  text={noteTextByType(props.item.notes, 'processinfo')} />) :
                (null)
              }
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessOrUse(props.item.notes) ?
        (<AccordionItem className='accordion__item' uuid='accessAndUse'>
          <AccordionItemHeading ariaLevel={2}>
            <AccordionItemButton className='accordion__button'>Access and Use</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className='accordion__panel'>
            <PanelTextSection
              title='Access'
              text={noteTextByType(props.item.notes, 'accessrestrict')} />
            <PanelTextSection
              title='Reproduction and Duplication'
              text={noteTextByType(props.item.notes, 'userestrict')} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { props.item.terms && props.item.terms.length ?
        (<AccordionItem className='accordion__item' uuid='relatedTerms'>
            <AccordionItemHeading ariaLevel={2}>
              <AccordionItemButton className='accordion__button'>Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion__panel'>
              <PanelListSection
                title='Subjects'
                listData={props.item.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
)}

RecordsDetail.propTypes = {
  ancestors: PropTypes.object.isRequired,
  downloadSize: PropTypes.string,
  isAncestorsLoading: PropTypes.bool.isRequired,
  isContentShown: PropTypes.bool,
  isItemLoading: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  myListCount: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsDetail;
