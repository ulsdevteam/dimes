import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";


export class CheckBoxInput extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <input
          type="checkbox"
          id={this.props.id}
          name={this.props.id}
          onChange={this.props.handleChange}
          defaultChecked={this.props.checked}
          required={this.props.required} />
        <label
          htmlFor={this.props.id}>
            {this.props.label}{this.props.required && " *"}
        </label>
      </div>
    )
  }
}

CheckBoxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

CheckBoxInput.defaultProps = {
  checked: true,
}

export class DatePickerInput extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id} >
            {this.props.label}{this.props.required && " *"}
        </label>
        <input
          type="date"
          id={this.props.id}
          max={this.props.max}
          min={this.props.min}
          name={this.props.id}
          onChange={this.props.handleChange}
          defaultValue={this.currentDay}
          required={this.props.required} />
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
  min: PropTypes.instanceOf(Date),
  required: PropTypes.bool
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
          value={this.props.value}
          required={this.props.required} />
        <label
          htmlFor={this.props.id}>
            {this.props.label}{this.props.required && " *"}
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
  handleChange: PropTypes.func,
  required: PropTypes.bool
};

export class RadioGroup extends Component {
  render() {
    return (
      <fieldset
        className={this.props.className}
        required={this.props.required}
        onChange={this.props.onChange}
      >
        <p>{this.props.label}{this.props.required && " *"}</p>
        {this.props.children}
      </fieldset>
    )
  }
}

RadioGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export class SelectInput extends Component {
  render()  {
    return (
      <div className={this.props.className} required={this.props.required}>
        <label
          htmlFor={this.props.id}>
            {this.props.label}{this.props.required && " *"}
        </label>
        <select
          name={this.props.id}
          id={this.props.id}
          onChange={this.props.handleChange}>
            {this.props.children}
        </select>
      </div>
    )
  }
}

SelectInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
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
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}

export class TextAreaInput extends Component {
  render()  {
    return (
      <div className={this.props.className}>
        <label
          htmlFor={this.props.id}>
            {this.props.label}{this.props.required && " *"}
        </label>
        <textarea
          id={this.props.id}
          name={this.props.id}
          rows={this.props.rows}
          cols={this.props.cols}
          required={this.props.required}
          value={this.props.value}
          onChange={this.props.handleChange} >
        </textarea>
      </div>
    )
  }
}

TextAreaInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  required: PropTypes.bool,
  value: PropTypes.string
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
            {this.props.label}{this.props.required && " *"}
        </label>
        <input
          type={this.props.type}
          id={this.props.id}
          name={this.props.id}
          placeholder={this.props.placeholder}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          size={this.props.size}
          required={this.props.required}
          onChange={this.props.handleChange}
          value={this.props.value} />
       </div>
    )
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['text', 'search']),
  value: PropTypes.string
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
            {this.props.label}{this.props.required && " *"}
        </label>
        <input
          type="number"
          id={this.props.id}
          max={this.currentYear}
          min={this.props.min}
          name={this.props.id}
          onChange={this.props.handleChange}
          value={this.props.value}
          required={this.props.required} />
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
  min: PropTypes.number,
  required: PropTypes.bool,
  value: PropTypes.number
};

YearInput.defaultProps = {
  max: new Date().getFullYear(),
  min: 0
}
