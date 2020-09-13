import React, { Component } from "react";
import "./styles.scss";


export const HitCount = ({ handleClick, hit_count }) => (
  <button className="tile__hit-count" onClick={handleClick}>{hit_count} matches</button>
)

const CategoryLabel = ({ category }) => (
  <div className={`tile__type-label ${category}`}>{category}</div>
)

const Tile = ({ category, date, handleHitCountClick, hit_count, title, uri }) => (
  <li className="tile">
    {hit_count && category === "collection" ? (<HitCount hit_count={hit_count} handleClick={() => handleHitCountClick(uri)} />) : null}
    {category ? (<CategoryLabel category={category} />) : null }
    <a className="tile__link" href={uri}>
      <h2 className="tile__title">{title}</h2>
    </a>
    <p className="tile__date">{date}</p>
  </li>)

class TileList extends Component {
  listItems = (items) => {
    return items.map((item) =>
      <Tile
        key={item.uri}
        {...item}
        handleHitCountClick={this.props.handleHitCountClick}
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
