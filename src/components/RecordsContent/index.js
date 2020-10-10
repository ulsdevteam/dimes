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
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.savedList !== this.props.savedList && this.props.item.group) {
      this.setState({ isSaved: isItemSaved(this.props.item, this.props.savedList)})
    }
  }

  toggleSaved = item => {
    this.props.toggleInList(item);
    this.setState({isSaved: !this.state.isSaved})
    this.props.setActiveRecords(item)
  }

  render() {
    const { ariaLevel, handleObjectClick, item, params, savedList,
            setActiveRecords, toggleInList, toggleIsLoading } = this.props;
    return (item.type === "object" ?
      (<div className={`child__list-item child__list-item--${item.type} ${item.isActive ? "active" : ""}`} >
        <button className={`child__title child__title--${item.type}`} onClick={() => handleObjectClick(item)}>{item.title}</button>
        <p className="child__text">{item.dates}</p>
        <p className="child__text child__description">{item.description}</p>
        {item.hit_count ? (<HitCount className="hit-count--records-" hitCount={item.hit_count} />) : null}
        <ListToggleButton
          className="btn-add--sm"
          isSaved={this.state.isSaved}
          item={this.props.item}
          toggleSaved={this.toggleSaved} />
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
          <p className="child__text child__description">{item.description}</p>
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
              parent={this.props.item}
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
      children: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
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

  toggleChildrenLoading = item => {
    const updatedChildren = this.state.children.map(child => {
      return (
      child.uri === item.uri ? {...child, isChildrenLoading: !child.isChildrenLoading} : child
    )})
    this.setState({ children: updatedChildren})
  }

  getChildrenPage = (uri, item) => {
    axios
      .get(uri)
      .then(res => {
        this.appendChildren(item, res.data.results);
        this.state.children.find(c => c.uri === item.uri).isChildrenLoading && this.toggleChildrenLoading(item);
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
        this.props.toggleIsLoading()
        const item = this.state.children.find(c => c.uri === uuid)
        // TODO: this is where we do the page fetch business!
        if (!item.children) {
          this.toggleChildrenLoading(item);
          const childrenParams = {...this.props.params, limit: 5}
          this.getChildrenPage(
            `${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}/children?${queryString.stringify(childrenParams)}`,
            item)
          axios
            .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(this.props.params)}`)
            .then(res => {
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
    <p className="collection__text collection__description">{collection.description}</p>
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
