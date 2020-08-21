import React, { Component, useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import MaterialIcon from "../MaterialIcon";
import "../Button/styles.scss";
import "./styles.scss";

const Dropdown = props => {
  const [buttonClassName] = useState(props.buttonClassName);
  const [className] = useState(props.className);
  const [iconBefore] = useState(props.iconBefore);
  const [iconBeforeOpen] = useState(props.iconBeforeOpen);
  const [items] = useState(props.items);
  const [itemClassName] = useState(props.itemClassName);
  const [label] = useState(props.label);
  const [listClassName] = useState(props.listClassName);
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(items.length);
  const openIcon = iconBeforeOpen ? iconBeforeOpen : iconBefore
  const listItems = items.map((item, idx) =>
    <a
      key={idx}
      id={`menu-item-${idx}`}
      className={`btn ${itemClassName}`}
      onClick={item.onClick}
      href={item.href}
      {...itemProps[idx]}>{item.iconBefore && <MaterialIcon icon={item.iconBefore} />}{item.label}{item.iconAfter && <MaterialIcon icon={item.iconAfter} />}</a>
  );
  return (
    <div className={`dropdown ${className}`}>
      <button
        className={`dropdown__button ${buttonClassName} ${isOpen ? "open" : "closed" }`}
        {...buttonProps} >
          {isOpen ? (<MaterialIcon icon={openIcon} />) : (iconBefore && <MaterialIcon icon={iconBefore} />)}
          {label}
      </button>
      <div
        className={`dropdown__list ${listClassName} ${isOpen ? "open" : "closed" }`}
        role="menu" >
        {listItems}
      </div>
    </div>
  )
}

export class MyListDropdown extends Component {
  render() {
    return (
      <Dropdown
        label="Actions"
        iconBefore="settings"
        className="mylist__actions"
        buttonClassName="btn btn--orange btn--md"
        itemClassName="btn--orange btn--dropdown dropdown__item--orange"
        listClassName="dropdown__list--orange"
        items={
          [
            {
              "label": "Schedule a Visit",
              "iconBefore": "account_balance",
              "onClick": null
            },
            {
              "label": "Request in Reading Room",
              "iconBefore": "local_library",
              "onClick": null
            },
            {
              "label": "Request Copies",
              "iconBefore": "content_copy",
              "onClick": null
            },
            {
              "label": "Email List",
              "iconBefore": "email",
              "onClick": null
            },
            {
              "label": "Download as .csv",
              "iconBefore": "get_app",
              "onClick": null
            },
            {
              "label": "Remove All Items",
              "iconBefore": "delete",
              "onClick": this.props.removeAllItems
            }
          ]
        } />
    )
  }
}

export class NavDropdown extends Component {
  render() {
    return (
      <Dropdown
        iconBefore="menu"
        iconBeforeOpen="close"
        className="nav-mobile hide-on-md-up"
        buttonClassName="btn nav-mobile__btn"
        itemClassName="btn--navy btn--mobile-dropdown dropdown__item--navy"
        listClassName="dropdown__list--mobile dropdown__list--navy"
        items={
          [
            {
              "label": "Sign in to RACcess",
              "iconAfter": "east",
              "onClick": null
            },
            {
              "label": "My List",
              "iconAfter": "east",
              "onClick": null
            }
          ]
        } />
    )
  }
}
