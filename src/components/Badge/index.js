import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss"

const Badge = ({ className, icon, label }) => (
  <span className={className}>
    {icon && icon} {label}
  </span>)

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string
}

export default Badge;
