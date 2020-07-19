import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Badge.scss"

class Badge extends Component {
  render() {
    return (
      <span className={this.props.className}>
        {this.props.icon && this.props.icon} {this.props.label}
      </span>
    )
  }
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string
}

export default Badge;
