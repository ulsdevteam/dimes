import React, { Component } from "react";
import "./styles.scss";


const HitCount = ({ hit_count }) => (
  <div className="tile__hit-count">{hit_count} matches</div>
)

const CategoryLabel = ({ category }) => (
  <div className={`tile__type-label ${category}`}>{category}</div>
)

const Tile = ({ category, date, hit_count, title, uri }) => (
  <li className="tile">
    <a className="tile__link" href={uri}>
      {hit_count && category === "collection" ? (<HitCount hit_count={hit_count} />) : null}
      {category ? (<CategoryLabel type={category} />) : null }
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
        date={item.dates?.length ? item.dates.map(d => d.expression).join(", ") : null} />
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
