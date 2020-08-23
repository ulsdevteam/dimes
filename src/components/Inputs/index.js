import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";


export const CheckBoxInput = ({ checked, className, handleChange, id, label, required}) => (
  <div className={className}>
    <input
      type="checkbox"
      id={id}
      name={id}
      onChange={handleChange}
      defaultChecked={checked}
      required={required} />
    <label
      htmlFor={id}>
        {label}{required && " *"}
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

export const DatePickerInput = ({ className, handleChange, id, label, max, min, required }) => (
  <div className={className}>
    <label
      htmlFor={id} >
        {label}{required && " *"}
    </label>
    <input
      type="date"
      id={id}
      max={max}
      min={min}
      name={id}
      onChange={handleChange}
      defaultValue={new Date()}
      required={required} />
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


export const EmailInput = ({ className, label, handleChange, id, maxLength, minLength, placeholder, required, size, value }) => (
  <div className={className}>
    <label
      htmlFor={id}>
        {label}{required && " *"}
    </label>
    <input
      type="email"
      id={id}
      name={id}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      size={size}
      required={required}
      onChange={handleChange}
      value={value} />
   </div>
)

EmailInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.string
};


export const RadioInput = ({ className, groupName, label, handleChange, id, required, value }) => (
  <div className={className}>
    <input
      type="radio"
      id={id}
      name={groupName}
      onChange={handleChange}
      value={value}
      required={required} />
    <label
      htmlFor={id}>
        {label}{required && " *"}
    </label>
  </div>
)

RadioInput.propTypes = {
  className: PropTypes.string,
  groupName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  required: PropTypes.bool
};

export const RadioGroup = ({ children, className, handleChange, label, required }) => (
  <fieldset
    className={className}
    required={required}
    onChange={handleChange}
  >
    <p>{label}{required && " *"}</p>
    {children}
  </fieldset>
)

RadioGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export const SelectInput =({ children, className, handleChange, label, id, required}) => (
  <div className={className} required={required}>
    <label
      htmlFor={id}>
        {label}{required && " *"}
    </label>
    <select
      name={id}
      id={id}
      onChange={handleChange}>
        {children}
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

export const TextAreaInput = ({ className, cols, handleChange, id, label, required, rows, value }) => (
  <div className={className}>
    <label
      htmlFor={id}>
        {label}{required && " *"}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      cols={cols}
      required={required}
      value={value}
      onChange={handleChange} >
    </textarea>
  </div>
)

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

export const TextInput = ({ className, handleChange, id, label, maxLength, minLength, placeholder, required, size, type, value }) => (
  <div className={className}>
    <label
      htmlFor={id}>
        {label}{required && " *"}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      size={size}
      required={required}
      onChange={handleChange}
      value={value} />
   </div>
)

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

export const YearInput = ({ className, handleChange, id, label, max, min, required, value }) => (
  <div className={className} >
    <label htmlFor={id} >
        {label}{required && " *"}
    </label>
    <input
      type="number"
      id={id}
      max={max}
      min={min}
      name={id}
      onChange={handleChange}
      value={value}
      required={required} />
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
