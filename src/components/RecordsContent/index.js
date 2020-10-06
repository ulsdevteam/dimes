import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
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
      isChildrenLoading: false,
      isSaved: false,
      itemChildren: [],
      itemData: {}
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.item.uri}?${queryString.stringify(this.props.params)}`)
      .then(res => {
        this.setState({ itemData: res.data })
        this.setState({ isSaved: isItemSaved(res.data, this.props.savedList)})
      })
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.savedList !== this.state.savedList && nextState.itemData !== this.state.itemData) {
      this.setState({ isSaved: isItemSaved(this.state.itemData, this.props.savedList)})
    }
  }

  handleClick = item => {
    const {params, parent, setActiveRecords, setParent, toggleActiveChild, toggleIsLoading} = this.props
    const isActive = toggleActiveChild(item);
    toggleIsLoading();
    if (isActive) {
      // Only fetch children if this is a collection and we haven't already fetched them.
      if (item.type === "collection" && !this.state.itemChildren.length) {
        this.setState({ isChildrenLoading: true })
      }
      axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(params)}`)
        .then(res => {
          this.setState({ itemChildren: res.data.children })
          this.setState({ isChildrenLoading: false })
          setParent(res.data);
          setActiveRecords(res.data);
          toggleIsLoading();
        })
        .catch(e => console.log(e))
    } else {
      axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}/${parent.uri}?${queryString.stringify(params)}`)
        .then(res => {
          setParent(res.data);
          toggleIsLoading();
        })
        .catch(e => console.log(e))
    }
  }

  toggleSaved = item => {
    this.props.toggleInList(item);
    this.setState({isSaved: !this.state.isSaved})
  }

  render() {
    const {item, params, savedList, setActiveRecords, setParent, toggleInList, toggleIsLoading} = this.props;
    return (
      <li>
        <div className={`child__list-item child__list-item--${item.type} ${item.isActive ? "active" : ""}`} >
          <button className={`child__title child__title--${item.type}`} onClick={() => this.handleClick(item)}>{item.title}</button>
          <p className="child__text">{item.dates}</p>
          <p className="child__text child__description">{item.description}</p>
          {this.state.hit_count ? (<HitCount className="hit-count--records-" hitCount={item.hit_count} />) : null}
          {item.type === "object" ?
            (<ListToggleButton
              className="btn-add--sm"
              isSaved={this.state.isSaved}
              item={this.state.itemData}
              toggleSaved={this.toggleSaved} />) :
            (null)}
        </div>
        {this.state.isChildrenLoading ? <RecordsChildSkeleton /> : null}
        {(this.state.itemChildren && this.state.itemChildren.length) ?
          (<RecordsContentList
            children={this.state.itemChildren}
            className={`${!item.isActive ? "hidden" : ""} ${this.state.itemChildren[0].type === "object" ? "child__list--bottom-level": ""}`}
            parent={item}
            params={params}
            savedList={savedList}
            setActiveRecords={setActiveRecords}
            setParent={setParent}
            toggleInList={toggleInList}
            toggleIsLoading={toggleIsLoading} />) :
          (null)}
      </li>
    )
  }
}

RecordsChild.propTypes = {
    parent: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    params: PropTypes.object,
    toggleActiveChild: PropTypes.func.isRequired,
    savedList: PropTypes.object.isRequired,
    setActiveRecords: PropTypes.func.isRequired,
    setParent: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
    toggleIsLoading: PropTypes.func.isRequired
}

class RecordsContentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children
    }
  }

  toggleActiveChild = item => {
    const toggled = !item.isActive
    const updated = this.state.children.map(child => (
      { ...child, isActive: child.uri === item.uri ? toggled : false }
    ))
    this.setState({children: updated})
    return toggled;
  }

  setParent = parent => {
    this.setState({ parent: parent })
  }

  childList = children => {
    const {parent, params, savedList, setActiveRecords, toggleInList, toggleIsLoading} = this.props;

    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          parent={parent}
          item={child}
          params={params}
          savedList={savedList}
          setActiveRecords={setActiveRecords}
          setParent={this.setParent}
          toggleActiveChild={this.toggleActiveChild}
          toggleInList={toggleInList}
          toggleIsLoading={toggleIsLoading} />
        )
      )
    )
  }

  render() {
    return (
      <ul className={`child__list ${this.props.className ? this.props.className : ""}`}>
        {this.childList(this.state.children)}
      </ul>
    )
  }
}

RecordsContentList.propTypes = {
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
