import React, { Component } from 'react';
import Button from "../Button";
import "./styles.scss";

class ActionItem extends Component {
  render() {
    return (
      <Button
        className={`dropdown__item ${this.props.className}`}
        onClick={this.props.onClick}
        label={this.props.label}
        iconBefore={this.props.iconBefore}/>
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
        className={`btn--orange btn--dropdown ${this.props.itemClassName}`}
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
          onClick={() => {this.toggleList()}}
          ariaHasPopup="true"
          ariaExpanded={this.state.isOpen} />
        <div
          className={`dropdown__list ${this.props.listClassName} ${ this.state.isOpen ? "open" : "closed" }`}
          role="menu" >
          {this.listItems}
        </div>
      </div>
    )
  }
}

export default Dropdown;
