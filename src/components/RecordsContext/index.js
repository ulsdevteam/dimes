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
    this.item = props.item;
    this.state = {
      isActive: false,
      isChildrenLoading: false,
      children: [],
    }
  }

  handleClick = item => {
    const prevActiveState = this.state.isActive;
    this.setState({ isActive: !this.state.isActive });
    if (!prevActiveState) {
      this.props.toggleIsLoading();
      // Only fetch children if this is a collection and we haven't already fetched them.
      if (item.type === "collection" && !this.state.children.length) {
        this.setState({ isChildrenLoading: true })
      }
      axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(this.props.params)}`)
        .then(res => {
          this.setState({ children: res.data.children })
          this.setState({ isChildrenLoading: false })
          this.props.setActiveRecords(res.data)
          this.props.toggleIsLoading();
        })
        .catch(e => console.log(e))
    } else {
      this.props.setActiveRecords(this.props.collection);
    }
  }

  itemChildList = (parent, children, props) => {
    return children && children.map((item, index) => (
      <RecordsChild
        key={item.uri}
        item={item}
        params={props.params}
        setActiveRecords={props.setActiveRecords}
        toggleIsLoading={props.toggleIsLoading} />
      )
    )
  }

  render() {
    return (
      <li>
        <div className={`child__list-item child__list-item--${this.item.type} ${this.state.isActive ? "active" : ""}`} >
          <button className={`child__title child__title--${this.item.type}`} onClick={() => this.handleClick(this.item)}>{this.item.title}</button>
          <p className="child__text">{this.item.dates}</p>
          <p className="child__text child__description">{this.item.description}</p>
          {this.state.hit_count ? (<HitCount className="hit-count--records-context" hitCount={this.item.hit_count} />) : null}
        </div>
        {this.state.children ?
          (this.state.isChildrenLoading ?
            (<RecordsChildSkeleton/>) :
            (<ul className={`child__list ${this.state.isActive ? "" : "hidden"}`}>{this.itemChildList(this.item, this.state.children, this.props)}</ul>)) :
          (null)}
      </li>
  )
}
}

const RecordsContextList = ({ collection, params, setActiveRecords, toggleIsLoading}) => {

  const childList = collection.children.map(child => (
    <RecordsChild
      key={child.uri}
      collection={collection}
      item={child}
      params={params}
      setActiveRecords={setActiveRecords}
      toggleIsLoading={toggleIsLoading} />
    )
  )

  return (
    <ul className="child__list--full-width">
      {childList}
    </ul>
  )
}

const RecordsContext = ({ params, records, setActiveRecords, toggleIsLoading }) => {
  const collection = (records.ancestors && records.ancestors.length) ? records.ancestors.slice(0)[0] : records;

  return (
  records.children ?
  (<div className="records__context">
    <h2 className="context__title">Collection Context</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{Array.isArray(collection.dates) ? dateString(collection.dates) : collection.dates }</p>
    <p className="collection__text collection__description">{collection.description}</p>
    <RecordsContextList
      collection={records}
      params={params}
      setActiveRecords={setActiveRecords}
      toggleIsLoading={toggleIsLoading} />
  </div>) :
  (null)
)}

export default RecordsContext;
