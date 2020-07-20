import React, { Component } from "react";
import PropTypes from "prop-types";

export class NavItem extends Component {
  render() {
    return (
      <li className={`${this.props.classPrefix}__nav-item`}>
        <a className={`${this.props.classPrefix}__nav-link`} href={this.props.href}>{this.props.label} {this.props.icon}</a>
      </li>
    )
  }
}

NavItem.propTypes = {
  classPrefix: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired
}

export class Nav extends Component {
  render() {
    return (
      <nav className={`${this.props.classPrefix}__nav`} aria-label={this.props.ariaLabel}>
        <ul className={`${this.props.classPrefix}__nav-list`}>
          {this.props.children}
        </ul>
      </nav>
    )
  }
}

Nav.propTypes = {
  classPrefix: PropTypes.string,
  ariaLabel: PropTypes.string
}
