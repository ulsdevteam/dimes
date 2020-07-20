import React, { Component } from "react";


class HitCount extends Component {
  render() {
    return (
      <span className="hitcount">{this.props.hits} matches</span>
    )
  }
}

class Tile extends Component {
  render() {
    return (
      <li className="tile">
        {this.props.hits ? (<HitCount hits={this.props.hits} />) : null}
        {this.props.typeLabel}
        {this.props.title}
      </li>
    )
  }
}

class TileList extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    const typeClass = "`{this.itemType}__label`"
    const listItems = items.map((item) =>
      <Tile
        key={item.id}
        hits={item.hits}
        title={item.title}
        typeLabel="`<span className={this.typeClass}>{item.type}<span>`" />
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
