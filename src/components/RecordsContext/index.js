import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import HitCount from "../HitCount";
import { RecordsChildSkeleton } from "../LoadingSkeleton";
import { dateString } from "../Helpers";
import "./styles.scss";


class RecordsChild extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChildrenLoading: false,
      itemChildren: [],
    }
  }

  handleClick = item => {
    const {params, parent, setActiveRecords, setParent, toggleActiveChild, toggleIsLoading} = this.props
    const isActive = toggleActiveChild(item);
    if (isActive) {
      toggleIsLoading();
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
      setActiveRecords(parent);
    }
  }

  render() {
    const {item, params, setActiveRecords, setParent, toggleIsLoading} = this.props;
    return (
      <li>
        <div className={`child__list-item child__list-item--${item.type} ${item.isActive ? "active" : ""}`} >
          <button className={`child__title child__title--${item.type}`} onClick={() => this.handleClick(item)}>{item.title}</button>
          <p className="child__text">{item.dates}</p>
          <p className="child__text child__description">{item.description}</p>
          {this.state.hit_count ? (<HitCount className="hit-count--records-context" hitCount={item.hit_count} />) : null}
        </div>
        {this.state.isChildrenLoading ? <RecordsChildSkeleton/> : null}
        {(this.state.itemChildren && this.state.itemChildren.length) ?
          (<RecordsContextList
            children={this.state.itemChildren}
            className={!item.isActive && "hidden"}
            parent={item}
            params={params}
            setActiveRecords={setActiveRecords}
            setParent={setParent}
            toggleIsLoading={toggleIsLoading} />) :
          (null)}
      </li>
    )
  }
}

class RecordsContextList extends Component {
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
    const {parent, params, setActiveRecords, toggleIsLoading} = this.props;
    return (
      children.map(child => (
        <RecordsChild
          key={child.uri}
          parent={parent}
          item={child}
          params={params}
          toggleActiveChild={this.toggleActiveChild}
          setActiveRecords={setActiveRecords}
          setParent={this.setParent}
          toggleIsLoading={toggleIsLoading} />
        )
      )
    )
  }

  render() {
    return (
      <ul className={`child__list--full-width ${this.props.className && this.props.className}`}>
        {this.childList(this.state.children)}
      </ul>
    )
  }
}

const RecordsContext = ({ params, parent, setActiveRecords, toggleIsLoading }) => {
  const collection = (parent.ancestors && parent.ancestors.length) ? parent.ancestors.slice(0)[0] : parent;

  return (
  parent.children ?
  (<div className="records__context">
    <h2 className="context__title">Collection Context</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{Array.isArray(collection.dates) ? dateString(collection.dates) : collection.dates }</p>
    <p className="collection__text collection__description">{collection.description}</p>
    <RecordsContextList
      children={parent.children}
      parent={parent}
      params={params}
      setActiveRecords={setActiveRecords}
      toggleIsLoading={toggleIsLoading} />
  </div>) :
  (null)
)}

export default RecordsContext;
