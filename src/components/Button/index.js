import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialIcon from "../MaterialIcon";
import "./styles.scss"


class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        className={`btn ${this.props.className}`}
        onClick={this.props.onClick}
        aria-label={this.props.ariaLabel}
        aria-haspopup={this.props.ariaHasPopup}
        aria-expanded={this.props.ariaExpanded}>
          {this.props.iconBefore && <i className="material-icons">{this.props.iconBefore}</i>} {this.props.label} {this.props.iconAfter && <i className="material-icons">{this.props.iconAfter}</i>}
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
