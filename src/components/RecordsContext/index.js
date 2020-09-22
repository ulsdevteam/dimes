import React from "react";
import { HitCount } from "../Tile";
import "./styles.scss";


const RecordsChild = ({ child, loadChildren }) => (
  <li className={`child__list-item child__list-item--${child.type}`}>
    <button className={`child__title child__title--${child.type}`} onClick={loadChildren}>{child.title}</button>
    <p className="child__text">{child.dates}</p>
    <p className="child__text">{child.description}</p>
    {child.hit_count ? (<HitCount hit_count={child.hit_count} />) : null}
  </li>
)

/** List of unresolved children */
const RecordsChildList = ({ children }) => {
  const loadChildren = parent => {
    console.log(parent)
    // resolve parent
    // Show parent.children if any
    // Show details in detail pane
    // load data
  }
  const listData = children.map(child => (
    // TODO: resolve child here?
    <RecordsChild
      key={child.uri}
      child={child}
      loadChildren={() => loadChildren(child)} />
    )
  )
  return (
    <ul className="child__list">
      {listData}
    </ul>
  )
}

const RecordsContext = ({ records }) => (
  records.children ?
  (<div className="context">
    <h2 className="context__title">Collection Context</h2>
    <h3 className="collection__title">{records.title}</h3>
    <p className="collection__date">{records.dates[0].expression}</p>
    <p className="collection__text">{records.description}</p>
    <RecordsChildList children={records.children} />
  </div>) :
  (null)
)

export default RecordsContext;
