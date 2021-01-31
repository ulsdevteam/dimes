import React from "react";
import PropTypes from "prop-types";
import "./styles.scss"

const Badge = ({ className, icon, label }) => (
  <span className={className}>
    {icon && icon} {label}
  </span>)

Badge.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired
}

export default Badge;
