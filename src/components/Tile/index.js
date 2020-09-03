import React, { Component } from "react";
import "./styles.scss";


const HitCount = ({ hit_count }) => (
  <div className="tile__hit-count">{hit_count} matches</div>
)

const TypeLabel = ({ type }) => (
  <div className={`tile__type-label ${type}`}>{type}</div>
)

const Tile = ({ category, date, hit_count, title, type, uri }) => (
  <li className="tile">
    <a className="tile__link" href={uri}>
      {hit_count ? (<HitCount hit_count={hit_count} />) : null}
      {type ? (<TypeLabel type={category} />) : null }
      <h2 className="tile__title">{title}</h2>
      <p className="tile__date">{date}</p>
    </a>
  </li>)

class TileList extends Component {
  listItems = (items) => {
    return items.map((item) =>
      <Tile
        key={item.uri}
        {...item}
        date={item.dates?.length && item.dates[0].expression} />
    );
  }
  render() {
    return (
      <ul className="tile-list">
        {this.listItems(this.props.items)}
      </ul>
    )
  }
}

export default TileList;
