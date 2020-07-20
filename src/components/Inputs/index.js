import React, { Component } from "react";
import PropTypes from "prop-types";


export class CheckBoxInput extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <input
          type="checkbox"
          id={this.props.id}
          name={this.props.id}
          onChange={this.props.handleChange} />
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
      </div>
    )
  }
}

CheckBoxInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export class DatePickerInput extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id} >
            {this.props.label}
        </label>
        <input
          type="date"
          id={this.props.id}
          max={this.props.max}
          min={this.props.min}
          name={this.props.id}
          onChange={this.props.handleChange}
          defaultValue={this.currentDay} />
      </div>
    )
  }
}

DatePickerInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date)
};

DatePickerInput.defaultProps = {
  min: new Date()
}

export class RadioInput extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <input
          type="radio"
          id={this.props.id}
          name={this.props.groupName}
          onChange={this.props.handleChange}
          value={this.props.id} />
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
      </div>
    )
  }
}

RadioInput.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func
};

export class RadioGroup extends Component {
  render() {
    return (
      <fieldset className={this.props.className}>
        <p>{this.props.label}</p>
        {this.props.children}
      </fieldset>
    )
  }
}

RadioGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired
};

export class SelectInput extends Component {
  render()  {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
        <select
          name={this.props.id}
          id={this.props.id}>
            {this.props.children}
        </select>
      </div>
    )
  }
}

SelectInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export class SelectOption extends Component {
  render() {
    return (
      <option
        value={this.props.value ? this.props.value : this.props.label.toLowerCase()}>
          {this.props.label}
      </option>
    )
  }
}

SelectOption.propTypes = {
  label: PropTypes.string.isRequired
}

export class TextAreaInput extends Component {
  render()  {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
        <textarea
          id={this.props.id}
          name={this.props.id}
          rows={this.props.rows}
          cols={this.props.cols}>
        </textarea>
      </div>
    )
  }
}

TextAreaInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number
}

TextAreaInput.defaultProps = {
  rows: 5,
  cols: 33
}

export class TextInput extends Component {
  render()  {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
        <input
          type="text"
          id={this.props.id}
          name={this.props.id}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          size={this.props.size} />
       </div>
    )
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  size: PropTypes.number
};

TextInput.defaultProps = {
  maxLength: 255,
  size: 10
}

export class YearInput extends Component {
  render() {
    return (
      <div className={this.props.className} >
        <label
          htmlFor={this.props.id}>
            {this.props.label}
        </label>
        <input
          type="number"
          id={this.props.id}
          max={this.currentYear}
          min={this.props.min}
          name={this.props.id}
          onChange={this.props.handleChange} />
      </div>
    )
  }
}

YearInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number
};

YearInput.defaultProps = {
  max: new Date().getFullYear(),
  min: 0
}
