import React, { Component } from "react";
import PropTypes from 'prop-types';


class Input extends Component {
  render() {
    return (
      <input className={this.props.className} type={this.props.type} id={this.props.id} onClick={this.props.handleClick} />
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired
};

class InputLabel extends Component {
  render() {
    return (
      <label className={this.props.className} htmlFor={this.props.id} >{this.props.label}</label>
    )
  }
}

InputLabel.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export class CheckBox extends Component {
  render() {
    return (
      <div>
        <Input className={this.props.className} type="checkbox" id={this.props.id} onClick={this.props.handleClick} />
        <InputLabel label={this.props.label} className={this.props.className} id={this.props.id} />
      </div>
    )
  }
}

CheckBox.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
