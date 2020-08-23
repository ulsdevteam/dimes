import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";


export const CheckBoxInput = (props) => (
  <div className={props.className}>
    <input
      type="checkbox"
      id={props.id}
      name={props.id}
      onChange={props.handleChange}
      defaultChecked={props.checked}
      required={props.required} />
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
  </div>
)

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

export const DatePickerInput = (props) => (
  <div className={props.className}>
    <label
      htmlFor={props.id} >
        {props.label}{props.required && " *"}
    </label>
    <input
      type="date"
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.id}
      onChange={props.handleChange}
      defaultValue={props.defaultValue ? props.defaultValue : new Date()}
      required={props.required} />
  </div>
)

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


export const EmailInput = (props) => (
  <div className={props.className}>
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
    <input
      type="email"
      id={props.id}
      name={props.id}
      placeholder={props.placeholder}
      minLength={props.minLength}
      maxLength={props.maxLength}
      size={props.size}
      required={props.required}
      onChange={props.handleChange}
      value={props.value} />
   </div>
)

EmailInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.string
};


export const RadioInput = (props) => (
  <div className={props.className}>
    <input
      type="radio"
      id={props.id}
      name={props.groupName}
      onChange={props.handleChange}
      value={props.value}
      required={props.required} />
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
  </div>
)

RadioInput.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string
};

export const RadioGroup = (props) => (
  <fieldset
    className={props.className}
    required={props.required}
    onChange={props.handleChange}
  >
    <p>{props.label}{props.required && " *"}</p>
    {props.children}
  </fieldset>
)

RadioGroup.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export const SelectInput = (props) => (
  <div className={props.className} required={props.required}>
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
    <select
      name={props.id}
      id={props.id}
      onChange={props.handleChange}>
        {props.children}
    </select>
  </div>
)

SelectInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
}

export const SelectOption = ({ label, value }) => (
  <option value={value ? value : label.toLowerCase()}>
    {label}
  </option>
)

SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}

export const TextAreaInput = (props) => (
  <div className={props.className}>
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
    <textarea
      id={props.id}
      name={props.id}
      rows={props.rows}
      cols={props.cols}
      required={props.required}
      value={props.value}
      onChange={props.handleChange} >
    </textarea>
  </div>
)

TextAreaInput.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string
}

TextAreaInput.defaultProps = {
  rows: 5,
  cols: 33
}

export const TextInput = (props) => (
  <div className={props.className}>
    <label
      htmlFor={props.id}>
        {props.label}{props.required && " *"}
    </label>
    <input
      type={props.type}
      id={props.id}
      name={props.id}
      placeholder={props.placeholder}
      minLength={props.minLength}
      maxLength={props.maxLength}
      size={props.size}
      required={props.required}
      onChange={props.handleChange}
      value={props.value} />
   </div>
)

TextInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['text', 'search']),
  value: PropTypes.string
};

TextInput.defaultProps = {
  maxLength: 255,
  size: 10
}

export const YearInput = (props) => (
  <div className={props.className} >
    <label htmlFor={props.id} >
        {props.label}{props.required && " *"}
    </label>
    <input
      type="number"
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.id}
      onChange={props.handleChange}
      value={props.value}
      required={props.required} />
  </div>
)

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
