import React from "react";
import PropTypes from "prop-types";
import { HitCountButton } from "../HitCount";
import MaterialIcon from "../MaterialIcon";
import { appendParams } from "../Helpers";
import "./styles.scss";


const CategoryLabel = ({ category }) => {
  var icon = ""
  switch(category) {
    case "person":
      icon = "person";
      break;
    case "organization":
      icon = "account_balance";
      break;
    default:
      icon = "archive_box"
  }
  return (
    <div className={`tile__type-label ${category}`}><MaterialIcon icon={icon} />{category}</div>
  )
}

const Tile = ({ category, date, handleHitCountClick, hit_count, params, title, uri }) => (
  <li className="tile">
    <a className="tile__title" href={appendParams(uri, params)}>{title}</a>
    {category ? (<CategoryLabel category={category} />) : null }
    {hit_count && category === "collection" ?
      (<HitCountButton className="hit-count--tile" hitCount={hit_count} handleClick={() => {handleHitCountClick && handleHitCountClick(uri)}} />) :
      (null)
    }
    <p className="tile__date">{date}</p>
  </li>)

const TileList = ({ handleHitCountClick, items, params }) => {
  const listItems = items.map((item) =>
    <Tile
      key={item.uri}
      {...item}
      handleHitCountClick={handleHitCountClick}
      params={params}
      date={item.dates?.length ? item.dates.map(d => d.expression).join(", ") : null} />
  );
  return (
    <ul className="tile-list">
      {listItems}
    </ul>
  )
}

TileList.propTypes = {
  handleHitCountClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.object
}

export default TileList;
