import React from "react";
import "./styles.scss";


export const HitCount = ({ handleClick, hit_count }) => (
  <button className="tile__hit-count" onClick={handleClick}>{hit_count} matches</button>
)

const CategoryLabel = ({ category }) => (
  <div className={`tile__type-label ${category}`}>{category}</div>
)

const Tile = ({ category, date, handleHitCountClick, hit_count, title, uri }) => (
  <li className="tile">
    <a className="tile__title" href={uri}>{title}</a>
    {category ? (<CategoryLabel category={category} />) : null }
    {hit_count && category === "collection" ? (<HitCount hit_count={hit_count} handleClick={() => handleHitCountClick(uri)} />) : null}
    <p className="tile__date">{date}</p>
  </li>)

const TileList = props => {
  const listItems = props.items.map((item) =>
    <Tile
      key={item.uri}
      {...item}
      handleHitCountClick={props.handleHitCountClick}
      date={item.dates?.length ? item.dates.map(d => d.expression).join(", ") : null} />
  );
  return (
    <ul className="tile-list">
      {listItems}
    </ul>
  )
}

export default TileList;
