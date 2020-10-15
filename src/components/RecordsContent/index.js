import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import HitCount from "../HitCount";
import LaunchViewerButton from "../LaunchViewerButton";
import ListToggleButton from "../ListToggleButton";
import { dateString } from "../Helpers";
import { isItemSaved } from "../MyListHelpers";
import "./styles.scss";


class RecordsChild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaved: false,
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.savedList !== this.props.savedList && this.props.item.group) {
      this.setState({ isSaved: isItemSaved(this.props.item, this.props.savedList)})
    }
  }

  handleItemClick = uri => {
    this.props.setActiveRecords(uri)
  }

  toggleSaved = item => {
    this.props.toggleInList(item);
    this.setState({isSaved: !this.state.isSaved})
    this.props.setActiveRecords(item.uri)
  }

  render() {
    const { ariaLevel, item, params, savedList, setActiveRecords, toggleInList } = this.props;
    return (item.type === "object" ?
      (<div className={`child__list-item child__list-item--${item.type} ${item.isActive ? "active" : ""}`} >
        <div className="child__description">
          <button className={`child__title child__title--${item.type}`} onClick={() => this.handleItemClick(item.uri)}>{item.title}</button>
          <p className="child__text">{item.dates}</p>
          <p className="child__text text--truncate">{item.description}</p>
          {item.hit_count ? (<HitCount className="hit-count--records-" hitCount={item.hit_count} />) : null}
        </div>
        <div className={`child__buttons${item.online ? "expanded" : ""}`}>
          {item.online ? (
          <LaunchViewerButton
            className="btn-launch--blue"
            uri={item.uri} />) : (null)}
          <ListToggleButton
            className="btn-add--sm"
            isSaved={this.state.isSaved}
            item={this.props.item}
            toggleSaved={this.toggleSaved} />
        </div>
      </div>) :
      (<AccordionItem
        uuid={item.uri}
        className={`child__list-accordion ${item.children && item.children[0].type === "object" ? "child__list-accordion--bottom-level": ""}`} >
        <AccordionItemHeading
          onClick={() => this.handleItemClick(item.uri)}
          aria-level={ariaLevel}
          className={
            `child__list-item child__list-item--${item.type}
            ${item.children && item.children[0].type === "object" ? "child__list-item--bottom-level": ""}
            ${item.isActive ? " active" : ""}`
          } >
          <AccordionItemButton className={`child__title child__title--${item.type}`}>
          {item.title}
          <p className="child__text">{item.dates}</p>
          <p className="child__text text--truncate">{item.description}</p>
          {item.hit_count ? (<HitCount className="hit-count--records-" hitCount={item.hit_count} />) : null}
          </AccordionItemButton>
        </AccordionItemHeading>
        {(item.children) ?
          (<AccordionItemPanel>
            <RecordsContentList
              ariaLevel={ariaLevel+1}
              children={item.children}
              className={`${item.children[0].type === "object" ? "child__list--bottom-level": ""}${item.isActive ? " active" : ""}`}
              parent={this.props.item}
              params={params}
              savedList={savedList}
              setActiveRecords={setActiveRecords}
              toggleInList={toggleInList} />
          </AccordionItemPanel>) :
          (null)}
      </AccordionItem>)
    )
  }
}

RecordsChild.propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object,
    parent: PropTypes.object.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    savedList: PropTypes.object.isRequired,
    toggleInList: PropTypes.func.isRequired,
}

class RecordsContentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: []
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.children.length !== this.state.children.length) {
      this.setState({ children: this.props.children})
    }
  }

  appendChildren = (item, newChildren) => {
    const updatedChildren = this.state.children.map(child => {
      if (child.uri === item.uri) {
        if (child.children) {
          return {...child, children: [...child.children].concat(newChildren)}
        } else {
          return {...child, children: newChildren}
        }
      } else {
        return child;
      }
    })
    this.setState({ children: updatedChildren })
  }

  toggleActiveChild = item => {
    const toggled = !item.isActive
    const updated = this.state.children.map(child => (
      { ...child, isActive: child.uri === item.uri ? toggled : false }
    ))
    this.setState({children: updated})
    return toggled;
  }

  getChildrenPage = (uri, item) => {
    axios
      .get(uri)
      .then(res => {
        this.appendChildren(item, res.data.results)
        res.data.next && this.getChildrenPage(res.data.next, item)
      })
      .catch(e => console.log(e))
  }

  /** Handles clicks on accordion items.
  * Fetches children if necessary, and sets activeRecords to self or parent
  */
  handleCollectionClick = uuidList => {
    if (uuidList.length) {
      for (const uuid of uuidList) {
        const item = this.state.children.find(c => c.uri === uuid)
        if (!item.children) {
          const childrenParams = {...this.props.params, limit: 5}
          this.getChildrenPage(
            `${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}/children?${queryString.stringify(childrenParams)}`,
            item)
        }
      }
    }
  }

  childList = children => {
    const { ariaLevel, parent, params, savedList, setActiveRecords, toggleInList } = this.props;
    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          ariaLevel={ariaLevel}
          item={child}
          params={params}
          parent={parent}
          savedList={savedList}
          setActiveRecords={setActiveRecords}
          toggleInList={toggleInList} />
        )
      )
    )
  }

  render() {
    return (
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        className={`child__list ${this.props.className ? this.props.className : ""}`}
        onChange={(uuidList) => this.handleCollectionClick(uuidList)}>
        {this.childList(this.state.children)}
      </Accordion>
    )
  }
}

RecordsContentList.propTypes = {
  ariaLevel: PropTypes.number.isRequired,
  children: PropTypes.array,
  className: PropTypes.string,
  parent: PropTypes.object.isRequired,
  params: PropTypes.object,
  savedList: PropTypes.object.isRequired,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}


const RecordsContent = props => {
  const { children, collection, isContentShown, params, parent, savedList, setActiveRecords, toggleInList } = props;

  return (
  children ?
  (<div className={`records__content ${isContentShown ? "" : "hidden"}`}>
    <h2 className="content__title">Collection Content</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{dateString(collection.dates)}</p>
    <p className="collection__text text--truncate">{collection.description}</p>
    <RecordsContentList
      ariaLevel={3}
      className="child__list--top-level"
      children={children}
      parent={parent}
      params={params}
      savedList={savedList}
      setActiveRecords={setActiveRecords}
      toggleInList={toggleInList} />
  </div>) :
  (null)
)}

RecordsContent.propTypes = {
  children: PropTypes.array.isRequired,
  collection: PropTypes.object.isRequired,
  isContentShown: PropTypes.bool.isRequired,
  params: PropTypes.object,
  parent: PropTypes.object.isRequired,
  savedList: PropTypes.object.isRequired,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsContent;
