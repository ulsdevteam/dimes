import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class MaterialIcon extends Component {
  render() {
    return (
      <span className="material-icons" aria-hidden="true">{this.props.icon}</span>
    )
  }
}

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default MaterialIcon
