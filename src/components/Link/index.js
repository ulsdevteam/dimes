import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss"

class Link extends Component {
  render() {
    return (
      <a
        className={this.props.className}
        href={this.props.href}>
          {this.props.label}
      </a>
    )
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired
}

export default Link;
