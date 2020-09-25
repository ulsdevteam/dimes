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
    this.params = props.params
    this.state = {
      isChildrenLoading: false,
      isActive: false,
      children: [],
    }
  }

  handleClick = item => {
    const isActive = this.state.isActive;
    this.setState({ isActive: !this.state.isActive })
    if (!isActive && !this.state.children.length) {
      this.setState({ isChildrenLoading: true })
      axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}/${item.uri}?${queryString.stringify(this.params)}`)
        .then(res => {
          this.setState({ children: res.data.children })
          this.setState({ isChildrenLoading: false })
        })
        .catch(e => console.log(e))
    }
  }

  itemChildList = (children, params) => {
    return children.map((item, index) => (
      <RecordsChild
        key={item.uri}
        item={item}
        params={params} />
      )
    )
  }

  render() {
    return (
      <li>
        <div className={`child__list-item child__list-item--${this.item.type} ${this.state.isActive ? "active" : null}`} >
          <button className={`child__title child__title--${this.item.type}`} onClick={() => this.handleClick(this.item)}>{this.item.title}</button>
          <p className="child__text">{this.item.dates}</p>
          <p className="child__text child__description">{this.item.description}</p>
          {this.item.hit_count ? (<HitCount className="hit-count--records-context" hitCount={this.item.hit_count} />) : null}
        </div>
        {this.state.children ?
          (this.state.isChildrenLoading ?
            (<RecordsChildSkeleton/>) :
            (<ul className={`child__list ${this.state.isActive ? null : "hidden"}`}>{this.itemChildList(this.state.children, this.params)}</ul>)) :
          (null)}
      </li>
  )
}
}

const RecordsContextList = ({ ancestors, children, params, setActiveRecords }) => {

  const childList = children.map(child => (
    <RecordsChild
      key={child.uri}
      item={child}
      params={params} />
    )
  )

  return (
    <ul className="child__list--full-width">
      {childList}
    </ul>
  )
}

const RecordsContext = ({ params, records, setActiveRecords }) => {
  const collection = (records.ancestors && records.ancestors.length) ? records.ancestors.slice(0)[0] : records;
  return (
  records.children ?
  (<div className="records__context">
    <h2 className="context__title">Collection Context</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{Array.isArray(collection.dates) ? dateString(collection.dates) : collection.dates }</p>
    <p className="collection__text collection__description">{collection.description}</p>
    <RecordsContextList
      ancestors={records.ancestors}
      children={records.children}
      params={params}
      setActiveRecords={setActiveRecords} />
  </div>) :
  (null)
)}

export default RecordsContext;
