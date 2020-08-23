import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "../MaterialIcon";
import "./styles.scss"


const Button = ({ ariaLabel, ariaHasPopup, ariaExpanded, className, disabled, handleClick, iconAfter, iconBefore, label, type }) => (
  <button
    type={type}
    className={`btn ${className}`}
    onClick={handleClick}
    aria-label={ariaLabel}
    aria-haspopup={ariaHasPopup}
    aria-expanded={ariaExpanded}
    disabled={disabled} >
      {iconBefore && <MaterialIcon icon={iconBefore} />} {label} {iconAfter && <MaterialIcon icon={iconAfter} />}
  </button>)

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
