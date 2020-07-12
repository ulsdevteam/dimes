import React, { Component } from "react";
import PropTypes from "prop-types";


export class NavItem extends Component {
  render() {
    return (
      <li>
        <a className={this.props.className} href={this.props.href}>{this.props.label} {this.props.icon}</a>
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
      <nav className={this.props.className}>
        <ul>
          {this.props.children}
        </ul>
      </nav>
    )
  }
}

Nav.propTypes = {
  className: PropTypes.string
}
