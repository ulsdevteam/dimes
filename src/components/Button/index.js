import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss"


class Button extends Component {
  render() {
    return (
      <button type={this.props.type} className={this.props.className} onClick={this.props.handleClick} aria-label={this.props.ariaLabel}>
        {this.props.iconBefore && this.props.iconBefore} {this.props.label} {this.props.iconAfter && this.props.iconAfter}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  label: PropTypes.string
};

export default Button;
