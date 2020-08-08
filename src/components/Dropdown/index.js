import React, { Component } from 'react';
import Button from "../Button";
import "./styles.scss";

class ActionItem extends Component {
  // TODO: should these be buttons rather than a list?
  render() {
    return (
      <li
        className={`dropdown__item ${this.props.className}`}
        onClick={this.props.onClick}>
          {this.props.iconBefore && <i className="material-icons">{this.props.iconBefore}</i>}
          {this.props.label}
      </li>
    )
  }
}

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "isOpen": false
    }
    const items = this.props.items
    this.listItems = items.map((item) =>
      <ActionItem
        key={item.label}
        className={this.props.itemClassName}
        label={item.label}
        iconBefore={item.iconBefore}
        onClick={item.onClick} />
    );
  }
  componentDidMount() {
    this.setState({"isOpen": false})
  }
  toggleList = () => {
    this.setState({"isOpen": !this.state.isOpen})
  }
  render() {
    return (
      <div className={`dropdown ${this.props.className}`}>
        <Button
          className={`dropdown__button ${this.props.buttonClassName}`}
          label={this.props.label}
          iconBefore={this.props.iconBefore}
          onClick={() => {this.toggleList()}} />
        <ul className={`dropdown__list ${this.props.listClassName} ${ this.state.isOpen ? "open" : "closed" }`}>
          {this.listItems}
        </ul>
      </div>
    )
  }
}

export default Dropdown;
