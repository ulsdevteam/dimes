import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "../MaterialIcon";
import {NavDropdown} from "../Dropdown";
import "./styles.scss";

export class NavItem extends Component {
  render() {
    return (
      <li className={`nav__item ${this.props.className ? this.props.className : ""}`}>
        <a
          className={`nav__link ${this.props.className ? this.props.className : ""}`}
          href={this.props.href}>{this.props.label} {this.props.icon && <MaterialIcon icon={this.props.icon} />}</a>
      </li>
    )
  }
}

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired
}

export class Nav extends Component {
  render() {
    return (
      <nav className={`nav ${this.props.className ? this.props.className : ""}`} aria-label={this.props.ariaLabel}>
        <ul className="nav__list show-on-md-up">
          {this.props.children}
        </ul>
        <NavDropdown />
      </nav>
    )
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string
}
