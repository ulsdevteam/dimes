import React, { Component, useEffect, useState } from 'react'
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
import { appendParams, dateString, formatMatchString, truncateString} from '../Helpers'
import { isItemSaved } from '../MyListHelpers'
import classnames from 'classnames'
import './styles.scss'


export class RecordsChild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: [],
      isExpanded: false,
      isSaved: false,
    }
  }

  /** If this item is in the preExpanded list
  *     - fetch its children and save to state
  *  If this item matches the URL we're on
  *     - scroll the item into view
  *     - apply focus to the item
  */
  componentDidMount() {
    const currentUrl = window.location.pathname
    this.setState({ isSaved: isItemSaved(this.props.item) })
    if (this.props.preExpanded.includes(this.props.item.uri) && this.props.item.uri.includes('collections')) {
      this.setState({ isExpanded: true })
      this.getChildrenPage(
        appendParams(
          `${process.env.REACT_APP_ARGO_BASEURL}${this.props.item.uri}/children`,
          {...this.props.params, limit: 5})
        )
    }
    if (this.props.item.uri === currentUrl) {
      const el = document.getElementById(`accordion__heading-${currentUrl}`)
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.focus()
    }
    if (this.props.item.uri === currentUrl || this.props.preExpanded.length < 2) {
      this.props.setIsLoading(false)
    }
  }

  /** Sets isItemSaved state when myListCount changes */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.myListCount !== this.props.myListCount) {
      this.setState({ isSaved: isItemSaved(this.props.item) })
    }
  }

  /** Fetches paginated content from the children endpoint */
  getChildrenPage = (uri, item) => {
    axios
      .get(uri)
      .then(res => {
        this.setState({ children: [...this.state.children].concat(res.data.results)})
        res.data.next && this.getChildrenPage(res.data.next)
      })
      .catch(e => console.log(e))
  }

  /** Loads a collection's children when a user clicks on it */
  handleCollectionClick = uri => {
    this.setState({ isExpanded: !this.state.isExpanded })
    this.props.setActiveRecords(uri)
    if (!this.state.children.length) {
      const childrenParams = {...this.props.params, limit: 5}
      this.getChildrenPage(
        appendParams(`${process.env.REACT_APP_ARGO_BASEURL}${uri}/children`, childrenParams))
    }
  }

  /** Calls the setActiveRecords callback function */
  handleItemClick = uri => {
    this.props.setActiveRecords(uri)
  }

  /** Add or remove an item from MyList */
  toggleSaved = item => {
    this.props.toggleInList(item);
    this.setState({isSaved: !this.state.isSaved})
    this.props.setActiveRecords(item.uri)
  }

  render() {
    const { ariaLevel, item, myListCount, params, preExpanded, setActiveRecords, setIsLoading, toggleInList } = this.props;
    const firstChildType = this.state.children.length && this.state.children[0].type
    const query = item.hit_count ? params.query : null
    return (item.type === 'object' ?
      (<div className={classnames('child__list-item', `child__list-item--${item.type}`)} >
        <div className='child__description'>
          <button id={`accordion__heading-${item.uri}`}
                  className={classnames('child__title', `child__title--${item.type}`)}
                  onClick={() => this.handleItemClick(item.uri)}>
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
            isSaved={this.state.isSaved}
            item={this.props.item}
            toggleSaved={this.toggleSaved} />
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
              onClick={() => this.handleCollectionClick(item.uri)} >
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
            <MaterialIcon icon={this.state.isExpanded ? 'expand_less' : 'expand_more'} />
          </AccordionItemButton>
        </AccordionItemHeading>
        {(this.state.children.length) ?
          (<AccordionItemPanel>
            <RecordsContentList
              ariaLevel={ariaLevel+1}
              children={this.state.children}
              className={classnames({'child__list--bottom-level': firstChildType === 'object'})}
              myListCount={myListCount}
              params={params}
              preExpanded={preExpanded}
              setActiveRecords={setActiveRecords}
              setIsLoading={setIsLoading}
              toggleInList={toggleInList} />
          </AccordionItemPanel>) :
          (null)}
      </AccordionItem>)
    )
  }
}

RecordsChild.propTypes = {
    item: PropTypes.object.isRequired,
    myListCount: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired,
    preExpanded: PropTypes.array.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
}

export const RecordsContentList = props => {

  const childList = children => {
    const { ariaLevel, myListCount, params, preExpanded, setActiveRecords, setIsLoading, toggleInList } = props;
    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          ariaLevel={ariaLevel}
          item={child}
          myListCount={myListCount}
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
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}


const RecordsContent = props => {
  const { children, collection, isContentShown, myListCount, params, preExpanded,
          setActiveRecords, toggleInList } = props;
  const [isLoading, setIsLoading] = useState(true)

  /** Focus on loading overlay when page is loading */
  useEffect(() => {
    if (isLoading) {
      const el = document.getElementById('content-loading')
      el && el.focus()
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
  params: PropTypes.object,
  preExpanded: PropTypes.array,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsContent;
