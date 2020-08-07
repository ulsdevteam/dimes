import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

export class NavItem extends Component {
  render() {
    return (
      <li className={`nav__item ${this.props.className}`}>
        <a className={`nav__link ${this.props.className}`} href={this.props.href}>{this.props.label} {this.props.icon && <i className="material-icons">{this.props.icon}</i>}</a>
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
      <nav className={`nav ${this.props.className && this.props.className}`} aria-label={this.props.ariaLabel}>
        <ul className="nav__list">
          {this.props.children}
        </ul>
      </nav>
    )
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string
}
