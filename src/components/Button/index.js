import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "../MaterialIcon";
import "./styles.scss"


class Button extends Component {
  render() {
    return (
      <button type={this.props.type} className={`btn ${this.props.className}`} onClick={this.props.onClick} aria-label={this.props.ariaLabel}>
        {this.props.iconBefore && <MaterialIcon icon={this.props.iconBefore} />} {this.props.label} {this.props.iconAfter && <MaterialIcon icon={this.props.iconAfter} />}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  label: PropTypes.string
};

export default Button;
