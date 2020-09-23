import React from "react";
import axios from "axios";
import queryString from "query-string";
import HitCount from "../HitCount";
import { dateString } from "../Helpers";
import "./styles.scss";


const RecordsChild = ({ child, handleRecordsChange }) => (
  <li className={`child__list-item child__list-item--${child.type}`}>
    <button className={`child__title child__title--${child.type}`} onClick={handleRecordsChange}>{child.title}</button>
    <p className="child__text">{child.dates}</p>
    <p className="child__text child__description">{child.description}</p>
    {child.hit_count ? (<HitCount className="hit-count--records-context" hitCount={child.hit_count} />) : null}
  </li>
)

const RecordsChildList = ({ children, params, setActiveRecords }) => {
  const handleRecordsChange = parent => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${parent.uri}?${queryString.stringify(params)}`)
      .then(res => {
        setActiveRecords(res.data);
      })
      .catch(e => console.log(e))
  }

  const listData = children.map(child => (
    <RecordsChild
      key={child.uri}
      child={child}
      handleRecordsChange={() => handleRecordsChange(child)} />
    )
  )

  return (
    <ul className="child__list">
      {listData}
    </ul>
  )
}

const RecordsContext = ({ params, records, setActiveRecords }) => {
  var collection = (records.ancestors && records.ancestors.length) ? records.ancestors.slice(-1)[0] : records;
  return (
  records.children ?
  (<div className="records__context">
    <h2 className="context__title">Collection Context</h2>
    <h3 className="collection__title">{collection.title}</h3>
    <p className="collection__date">{Array.isArray(collection.dates) ? dateString(collection.dates) : collection.dates }</p>
    <p className="collection__text collection__description">{collection.description}</p>
    <RecordsChildList
      children={records.children}
      params={params}
      setActiveRecords={setActiveRecords} />
  </div>) :
  (null)
)}

export default RecordsContext;
