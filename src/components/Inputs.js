import React, { Component } from "react";
import PropTypes from 'prop-types';


export class CheckBox extends Component {
  render() {
    return (
      <div>
        <input
          type="checkbox"
          className={this.props.className}
          id={this.props.id}
          name={this.props.id}
          onClick={this.props.handleClick} />
        <label
          className={this.props.className}
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
      </div>
    )
  }
}

CheckBox.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date();
  }
  render() {
    return (
      <div>
        <label className={this.props.className} htmlFor={this.props.id} >
          {this.props.label}
        </label>
        <input
          type="date"
          className={this.props.className}
          id={this.props.id}
          max={this.props.max}
          min={this.currentDay}
          name={this.props.id}
          onClick={this.props.handleClick}
          defaultValue={this.currentDay} />
      </div>
    )
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.string,
  defaultValue: PropTypes.string
};

export class YearInput extends Component {
  constructor(props) {
    super(props);
    this.currentYear = new Date().getFullYear();
  }
  render() {
    return (
      <div>
        <label className={this.props.className} htmlFor={this.props.id} >
          {this.props.label}
        </label>
        <input
          type="number"
          className={this.props.className}
          id={this.props.id}
          max={this.currentYear}
          min="0"
          name={this.props.id}
          onClick={this.props.handleClick} />
      </div>
    )
  }
}

YearInput.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
