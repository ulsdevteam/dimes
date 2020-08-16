import React, { Component } from "react";
import "./styles.scss";


class HitCount extends Component {
  render() {
    return (
      <div className="tile__hit-count">{this.props.hits} matches</div>
    )
  }
}

class TypeLabel extends Component {
  render() {
    return (
      <div className="tile__type-label">{this.props.type}</div>
    )
  }
}

class Tile extends Component {
  render() {
    return (
      <li className="tile">
        <a className="tile__link" href={this.props.uri}>
          {this.props.hit_count ? (<HitCount hits={this.props.hit_count} />) : null}
          {this.props.type ? (<TypeLabel type={this.props.type} />) : null }
          <div className="tile__title">{this.props.title}</div>
          <div className="tile__date">{this.props.date}</div>
        </a>
      </li>
    )
  }
}

class TileList extends Component {
  listItems = (items) => {
    return items.map((item) =>
      <Tile
        key={item.uri}
        hit_count={item.hit_count}
        title={item.title}
        type={item.type}
        date={item.dates?.length && item.dates[0].expression}
        uri={item.uri} />
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
