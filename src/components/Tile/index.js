import React, { Component } from "react";
import "./styles.scss";


const HitCount = ({ hits }) => (
  <div className="tile__hit-count">{hits} matches</div>
)

const TypeLabel = ({ type }) => (
  <div className="tile__type-label">{type}</div>
)

const Tile = ({date, hits, title, type, uri}) => (
  <li className="tile">
    <a className="tile__link" href={uri}>
      {hits ? (<HitCount hits={hits} />) : null}
      {type ? (<TypeLabel type={type} />) : null }
      <div className="tile__title">{title}</div>
      <div className="tile__date">{date}</div>
    </a>
  </li>)

class TileList extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.listItems = items.map((item) =>
      <Tile
        key={item.uri}
        {...item}
        date={item.dates?.length && item.dates[0].expression} />
    );
  }
  render() {
    return (
      <ul className="tile-list">
        {this.listItems}
      </ul>
    )
  }
}

export default TileList;
