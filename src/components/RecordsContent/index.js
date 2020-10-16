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
import ListToggleButton from "../ListToggleButton";
import { RecordsChildSkeleton } from "../LoadingSkeleton";
import { dateString } from "../Helpers";
import { isItemSaved } from "../MyListHelpers";
import "./styles.scss";


class RecordsChild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaved: false,
      itemData: {}
    }
  }

  componentDidMount() {
    /** fetching the full data may not be necessary with new child endpoint */
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.item.uri}?${queryString.stringify(this.props.params)}`)
      .then(res => {
        this.setState({ itemData: res.data })
        this.setState({ isSaved: isItemSaved(res.data, this.props.savedList)})
      })
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.savedList !== this.props.savedList && this.state.itemData.group) {
      this.setState({ isSaved: isItemSaved(this.state.itemData, this.props.savedList)})
    }
  }

  toggleSaved = item => {
    this.props.toggleInList(item);
    this.setState({isSaved: !this.state.isSaved})
    this.props.setActiveRecords(this.state.itemData)
  }

  render() {
    const { ariaLevel, handleObjectClick, item, params, savedList,
            setActiveRecords, toggleInList, toggleIsLoading } = this.props;
    return (item.type === "object" ?
      (<div className={`child__list-item child__list-item--${item.type} ${item.isActive ? "active" : ""}`} >
        <div className="child__description">
          <button className={`child__title child__title--${item.type}`} onClick={() => handleObjectClick(item)}>{item.title}</button>
          <p className="child__text">{item.dates}</p>
          <p className="child__text text--truncate">{item.description}</p>
          {item.hit_count ? (<HitCount className="hit-count--records-" hitCount={item.hit_count} />) : null}
        </div>
        <div className="child__buttons">
          <ListToggleButton
            className="btn-add--sm"
            isSaved={this.state.isSaved}
            item={this.state.itemData}
            toggleSaved={this.toggleSaved} />
        </div>
      </div>) :
      (<AccordionItem uuid={item.uri} className={`child__list-accordion ${item.children && item.children[0].type === "object" ? "child__list-accordion--bottom-level": ""}`}>
        <AccordionItemHeading
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
        {item.isChildrenLoading ? <RecordsChildSkeleton/> : null}
        {(item.children) ?
          (<AccordionItemPanel>
            <RecordsContentList
              ariaLevel={ariaLevel+1}
              children={item.children}
              className={`${item.children[0].type === "object" ? "child__list--bottom-level": ""}${item.isActive ? " active" : ""}`}
              parent={this.state.itemData}
              params={params}
              savedList={savedList}
              setActiveRecords={setActiveRecords}
              toggleInList={toggleInList}
              toggleIsLoading={toggleIsLoading} />
          </AccordionItemPanel>) :
          (null)}
      </AccordionItem>)
    )
  }
}

RecordsChild.propTypes = {
    handleObjectClick: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    params: PropTypes.object,
    parent: PropTypes.object.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    savedList: PropTypes.object.isRequired,
    toggleInList: PropTypes.func.isRequired,
    toggleIsLoading: PropTypes.func.isRequired,
}

class RecordsContentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children
    }
  }

  addChildren = (item, children) => {
    const updatedChildren = this.state.children.map(child => (
      child.uri === item.uri ? { ...child, children: children } : child
    ))
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

  toggleChildrenLoading = item => {
    const updatedChildren = this.state.children.map(child => {
      return (
      child.uri === item.uri ? {...child, isChildrenLoading: !child.isChildrenLoading} : child
    )})
    this.setState({ children: updatedChildren})
  }

  /** Handles clicks on accordion items.
  * Fetches children if necessary, and sets activeRecords to self or parent
  */
  handleCollectionClick = uuidList => {
    if (uuidList.length) {
      for (const uuid of uuidList) {
        const item = this.state.children.filter(c => {return c.uri === uuid})[0]
        if (!item.children) {
          this.toggleChildrenLoading(item);
          this.props.toggleIsLoading();
          axios
            .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(this.props.params)}`)
            .then(res => {
              this.addChildren(item, res.data.children);
              this.toggleChildrenLoading(item);
              this.props.setActiveRecords(res.data);
            })
            .catch(e => console.log(e))
            .then(() => this.props.toggleIsLoading())
        }
      }
    } else {
      this.props.setActiveRecords(this.props.parent);
    }
  }

  handleObjectClick = item => {
    this.props.toggleIsLoading();
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(this.props.params)}`)
      .then(res => {
        this.props.setActiveRecords(res.data);
      })
      .catch(e => console.log(e))
      .then(() => this.props.toggleIsLoading());
  }

  childList = children => {
    const { ariaLevel, parent, params, savedList, setActiveRecords,
            toggleInList, toggleIsLoading } = this.props;

    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          ariaLevel={ariaLevel}
          handleObjectClick={this.handleObjectClick}
          item={child}
          params={params}
          parent={parent}
          savedList={savedList}
          setActiveRecords={setActiveRecords}
          toggleInList={toggleInList}
          toggleIsLoading={toggleIsLoading} />
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
  toggleIsLoading: PropTypes.func.isRequired,
}


const RecordsContent = props => {
  const { isContentShown, params, parent, savedList, setActiveRecords, toggleInList, toggleIsLoading } = props;
  const collection = (parent.ancestors && parent.ancestors.length) ? parent.ancestors.slice(0)[0] : parent;

  return (
  parent.children ?
  (<div className={`records__content ${isContentShown ? "" : "hidden"}`}>
    <h2 className="content__title">Collection Content</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{Array.isArray(collection.dates) ? dateString(collection.dates) : collection.dates }</p>
    <p className="collection__text text--truncate">{collection.description}</p>
    <RecordsContentList
      ariaLevel={3}
      children={parent.children}
      className="child__list--top-level"
      parent={parent}
      params={params}
      savedList={savedList}
      setActiveRecords={setActiveRecords}
      toggleInList={toggleInList}
      toggleIsLoading={toggleIsLoading} />
  </div>) :
  (null)
)}

RecordsContent.propTypes = {
  isContentShown: PropTypes.bool.isRequired,
  params: PropTypes.object,
  parent: PropTypes.object.isRequired,
  savedList: PropTypes.object.isRequired,
  setActiveRecords: PropTypes.func.isRequired,
  toggleInList: PropTypes.func.isRequired,
  toggleIsLoading: PropTypes.func.isRequired,
}

export default RecordsContent;
