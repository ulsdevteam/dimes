import React, { Component } from "react";
import "./styles.scss";


class HitCount extends Component {
  render() {
    return (
      <span className="tile__hit-count">{this.props.hits} matches</span>
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
        {this.props.hits ? (<HitCount hits={this.props.hits} />) : null}
        {this.props.type ? (<TypeLabel type={this.props.type} />) : null }
        <div className="tile__title">{this.props.title}</div>
        <div className="tile__date">{this.props.date}</div>
      </li>
    )
  }
}

class TileList extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.listItems = items.map((item) =>
      <Tile
        key={item.id}
        hits={item.hits}
        title={item.title}
        type={item.type} />
    );
  }
  render() {
    return (
      <ul>
        {this.listItems}
      </ul>
    )
  }
}

export default TileList;
