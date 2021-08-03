import React, { useEffect, createRef, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from '../Accordion';
import { Badge } from '../Badge'
import ListToggleButton from '../ListToggleButton'
import MaterialIcon from '../MaterialIcon'
import QueryHighlighter from '../QueryHighlighter'
import { appendParams, dateString, isMobile, formatMatchString, truncateString} from '../Helpers'
import { useOnScreen } from '../Hooks'
import { isItemSaved } from '../MyListHelpers'
import classnames from 'classnames'
import './styles.scss'

export const RecordsChild = props => {
  /* Individual item in the RecordsContentList.
  * Contains the most complex logic for loading components and their children.
  * 1. Determines if the current item is a parent of the target object or collection.
  * 2. Determines if the target is an object that is a direct descendant of the current item.
  * 3. Determines whether the current item's first child is a collection or object.
  * 4. Create refs which are used to trigger lazy loading.
  * 5. Observe when the refs created in 4 are visible.
  * 6. Determines if the target object or collection has been loaded.
  */
  const { ariaLevel, item, myListCount, params, preExpanded, setActiveRecords,
          setIsLoading, toggleInList } = props
  const [children, setChildren] = useState([])
  const [childCount, setChildCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [offsetAfter, setOffsetAfter] = useState(props.offsetAfter)
  const [offsetBefore, setOffsetBefore] = useState(props.offsetBefore)
  const currentUrl = window.location.pathname
  const itemUri = `${process.env.REACT_APP_ARGO_BASEURL}${item.uri}/children`
  const query = item.hit_count ? params.query : null
  const pageSize = 5
  const targetElementLoaded = item.uri === currentUrl /* 6 */
  const isParentCollection = preExpanded.includes(item.uri) && item.uri.includes('collections') /* 1 */
  const targetIsDirectDescendant = currentUrl.includes('objects') && item.uri === preExpanded.slice(-1)[0] /* 2 */
  const firstChildType = children.length && children[0].type /* 3 */
  const refBefore = createRef() /* 4 */
  const refAfter = createRef() /* 4 */
  const isBeforeVisible = useOnScreen(refBefore) /* 5 */
  const isAfterVisible = useOnScreen(refAfter) /* 5 */

  /* Loads all pages of paginated content */
  const getPages = uri => {
    axios
        .get(uri)
        .then(res => {
          setChildCount(res.data.count)
          setChildren(children => children.concat(res.data.results))
          res.data.next && getPages(res.data.next)
        }
      )
      .catch(err => console.log(err))
  }

  /* Fetches the page previous to a given offset */
  const getPageBefore = (uri, params, pageSize) => {
    const updatedParams = {
      ...params,
      offset: offsetBefore >= pageSize ? offsetBefore - (pageSize - 1) : 0, /* 2 */
      limit: offsetBefore >= pageSize ? pageSize : offsetBefore
    }
    console.log(appendParams(uri, updatedParams));
    axios
        .get(appendParams(uri, updatedParams))
        .then(res => {
          setChildren(children => res.data.results.concat(children))
          const newOffset = updatedParams.offset < updatedParams.limit ? 0 : updatedParams.offset - updatedParams.limit
          setOffsetBefore(updatedParams => newOffset)
        }
      )
      .catch(err => console.log(err))
  }

  /* Fetches the next page after a given offset */
  const getPageAfter = (uri, params, pageSize) => {
    const updatedParams = {
      ...params,
      offset: offsetAfter,
      limit: pageSize,
    }
    console.log(appendParams(uri, updatedParams));
    axios
        .get(appendParams(uri, updatedParams))
        .then(res => {
          setChildCount(res.data.count)
          setChildren(children => children.concat(res.data.results))
          setOffsetAfter(offsetAfter + pageSize)
        }
      )
      .catch(err => console.log(err))
  }

  /** Loads all children of a collection */
  const handleCollectionClick = uri => {
    setIsExpanded(!isExpanded)
    props.setActiveRecords(uri)
    if (!children.length) {
      getPages(
        appendParams(
          `${process.env.REACT_APP_ARGO_BASEURL}${uri}/children`,
          {...props.params, limit: 5}
        )
      )
    }
  }

  /** Calls the setActiveRecords callback function */
  const handleItemClick = uri => {
    props.setActiveRecords(uri)
  }

  /** Add or remove an item from MyList */
  const toggleSaved = item => {
    props.toggleInList(item)
    setIsSaved(!isSaved)
    props.setActiveRecords(item.uri)
  }

  /* Scroll item matching currentUrl into view and focus on it */
  useEffect(() => {
    if (targetElementLoaded) {
      const targetElement = document.getElementById(`accordion__heading-${currentUrl}`)
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      targetElement.focus()
    }
  }, [currentUrl, targetElementLoaded])

  /* Set isLoading to false once loading has completed */
  useEffect(() => {
    if (targetElementLoaded || preExpanded.length < 2) {
      setIsLoading(false)
    }
  }, [targetElementLoaded, setIsLoading, preExpanded])

  /* Loads children of current item
  * 1. Execute alternate loading strategy on parents of target object. This is only
  *    used when loading ant object, which can be a long ways down a list.
  * 2. If targeting a collection, fetch all its children and save to state
  */
  useEffect(() => {
    if (isParentCollection) {
      setIsExpanded(true)
      if (targetIsDirectDescendant) { /* 1 */
        getPageBefore(itemUri, params, pageSize)
        getPageAfter(itemUri, params, pageSize)
      } else { /* 2 */
        getPages(appendParams(itemUri, {...params, limit: pageSize}))
      }
    }
  }, [isParentCollection, itemUri, params, targetIsDirectDescendant])

  /* Load previous page if available when loading trigger is visible */
  useEffect(() => {
    (isBeforeVisible && offsetBefore > 0) && getPageBefore(itemUri, params, pageSize)
  }, [isBeforeVisible, itemUri, offsetBefore, params])

  /* Load next page if available when loading trigger is visible */
  useEffect(() => {
    (isAfterVisible && offsetAfter < childCount) && getPageAfter(itemUri, params, pageSize)
  }, [childCount, isAfterVisible, itemUri, offsetAfter, params])

  /** Sets isItemSaved state when myListCount changes */
  useEffect(() => {
    setIsSaved(isItemSaved(item))
  }, [item, myListCount])

  return (item.type === 'object' ?
    (<div className={classnames('child__list-item', `child__list-item--${item.type}`)} >
      <div className='child__description'>
        <button id={`accordion__heading-${item.uri}`}
                className={classnames('child__title', `child__title--${item.type}`)}
                onClick={() => handleItemClick(item.uri)}>
          <QueryHighlighter query={query} text={item.title} />
        </button>
        {item.dates === item.title ? (null) : (<p className='child__text'>{item.dates}</p>)}
      </div>
      <div className='child__buttons'>
        {item.online ? (
          <a className='btn btn-launch--content'
             href={`${item.uri}/view`}>{isMobile? 'View' : 'View Online'}
             <MaterialIcon icon='visibility' /></a>) :
          (null)
        }
        <ListToggleButton
          className='btn-add--content'
          isMobile={isMobile}
          isSaved={isSaved}
          item={props.item}
          toggleSaved={toggleSaved} />
      </div>
      <p className='child__text text--truncate'>
        <QueryHighlighter query={query} text={truncateString(item.description, 200)} />
      </p>
      {item.hit_count ?
        <div className="child__badges">
          <Badge className='badge--orange' text={formatMatchString(item.hit_count)} />
          {item.online_hit_count ? <Badge className='badge--blue' text={formatMatchString(item.online_hit_count, true)} /> : null}
        </div>
        : null}
    </div>) :
    (<AccordionItem
      preExpanded={preExpanded}
      uuid={item.uri}
      className={classnames(
        'child__list-accordion',
        {'child__list-accordion--bottom-level': firstChildType === 'object'}
      )} >
      <AccordionItemHeading
        ariaLevel={ariaLevel}
        className={classnames(
          'child__list-item',
          `child__list-item--${item.type}`,
          {'child__list-item--bottom-level': firstChildType === 'object'},
        )} >
        <AccordionItemButton
            className={`child__title child__title--${item.type}`}
            onClick={() => handleCollectionClick(item.uri)} >
          <QueryHighlighter query={query} text={item.title} />
          {item.title === item.dates ? (null) : (<p className='child__text'>{item.dates}</p>)}
          <p className='child__text text--truncate'>
            <QueryHighlighter query={query} text={truncateString(item.description, 200)} />
          </p>
          {item.hit_count ?
            <div className="child__badges">
              <Badge className='badge--orange' text={formatMatchString(item.hit_count)} />
              {item.online_hit_count ? <Badge className='badge--blue' text={formatMatchString(item.online_hit_count, true)} /> : null}
            </div>
            : null}
          <MaterialIcon icon={isExpanded ? 'expand_less' : 'expand_more'} />
        </AccordionItemButton>
      </AccordionItemHeading>
      {(children.length) ?
        (<AccordionItemPanel>
          {targetIsDirectDescendant ? <div id="loadingBefore" ref={refBefore}></div> : null}
          <RecordsContentList
            ariaLevel={ariaLevel+1}
            children={children}
            className={classnames({'child__list--bottom-level': firstChildType === 'object'})}
            myListCount={myListCount}
            offsetAfter={offsetAfter}
            offsetBefore={offsetBefore}
            params={params}
            preExpanded={preExpanded}
            setActiveRecords={setActiveRecords}
            setIsLoading={setIsLoading}
            toggleInList={toggleInList} />
          {targetIsDirectDescendant ? <div id="loadingAfter" ref={refAfter}></div> : null}
        </AccordionItemPanel>
        ) :
        (null)}
    </AccordionItem>)
  )
}

RecordsChild.propTypes = {
    item: PropTypes.object.isRequired,
    myListCount: PropTypes.number.isRequired,
    offsetAfter: PropTypes.number,
    offsetBefore: PropTypes.number,
    params: PropTypes.object.isRequired,
    preExpanded: PropTypes.array.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
}

export const RecordsContentList = props => {

  const childList = children => {
    const { ariaLevel, myListCount, offsetAfter, offsetBefore, params, preExpanded,
            setActiveRecords, setIsLoading, toggleInList } = props;
    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          ariaLevel={ariaLevel}
          item={child}
          myListCount={myListCount}
          offsetAfter={offsetAfter}
          offsetBefore={offsetBefore}
          params={params}
          preExpanded={preExpanded}
          setActiveRecords={setActiveRecords}
          setIsLoading={setIsLoading}
          toggleInList={toggleInList} />
        )
      )
    )
  }

  return (
    <Accordion
      className={classnames('child__list', props.className)}
      preExpanded={props.preExpanded} >
      {childList(props.children)}
    </Accordion>
  )
}

RecordsContentList.propTypes = {
  ariaLevel: PropTypes.number.isRequired,
  children: PropTypes.array,
  className: PropTypes.string,
  myListCount: PropTypes.number.isRequired,
  offsetAfter: PropTypes.number,
  offsetBefore: PropTypes.number,
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}


const RecordsContent = props => {
  const { children, collection, isContentShown, myListCount, offsetAfter,
          offsetBefore, params, preExpanded, setActiveRecords, toggleInList } = props;
  const [isLoading, setIsLoading] = useState(true)

  /** Focus on loading overlay when page is loading */
  useEffect(() => {
    if (isLoading) {
      const overlay = document.getElementById('content-loading')
      overlay && overlay.focus()
    }
  }, [isLoading, preExpanded])

  return (
  children ?
    (<div className={classnames('records__content', {'hidden': !isContentShown})}>
      {isLoading ? (
        <div className='loading'>
          <p id='content-loading' className='loading__text loading-dots'>Loading</p>
        </div>) : (null)}
      <h2 className='content__title'>Collection Content</h2>
      <h3 className='collection__title'>{collection.title}</h3>
      <p className='collection__date'>{dateString(collection.dates)}</p>
      <p className='collection__text text--truncate'>
        {truncateString(collection.description, 180)}
      </p>
      <RecordsContentList
        ariaLevel={3}
        className='child__list--top-level'
        children={children}
        myListCount={myListCount}
        offsetAfter={offsetAfter}
        offsetBefore={offsetBefore}
        params={params}
        preExpanded={preExpanded}
        setActiveRecords={setActiveRecords}
        setIsLoading={setIsLoading}
        toggleInList={toggleInList} />
    </div>) :
    (null)
  )
}

RecordsContent.propTypes = {
  children: PropTypes.array.isRequired,
  collection: PropTypes.object.isRequired,
  isContentShown: PropTypes.bool.isRequired,
  myListCount: PropTypes.number.isRequired,
  offsetAfter: PropTypes.number,
  offsetBefore: PropTypes.number,
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsContent;
