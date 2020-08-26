import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";


const InputLabel = ({id, label, required}) => (
  <label htmlFor={id}>
    {label}{required && " *"}
  </label>)

InputLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  required: PropTypes.bool
}


export const CheckBoxInput = (props) => (
  <div className={props.className}>
    <input
      type="checkbox"
      id={props.id}
      name={props.id}
      onChange={props.handleChange}
      defaultChecked={props.checked}
      required={props.required} />
    <InputLabel {...props} />
  </div>
)

CheckBoxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  required: PropTypes.bool
};

CheckBoxInput.defaultProps = {
  checked: true,
}

export const DatePickerInput = (props) => (
  <div className={props.className}>
    <InputLabel {...props} />
    <input
      type="date"
      id={props.id}
      aria-describedby={`desc-${props.id}`}
      max={props.max}
      min={props.min}
      name={props.id}
      onChange={props.handleChange}
      value={props.value}
      required={props.required} />
    {props.helpText && <p className="help-text" aria-describedby={`desc-${props.id}`}>{props.helpText}</p>}
  </div>
)

DatePickerInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

DatePickerInput.defaultProps = {
  min: new Date().toISOString().substring(0, 10),
  value: new Date().toISOString().substring(0, 10)
}


export const EmailInput = (props) => (
  <div className={props.className}>
    <InputLabel {...props} />
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
    <InputLabel {...props} />
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
    <InputLabel {...props} />
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
    <InputLabel {...props} />
    <textarea
      id={props.id}
      name={props.id}
      aria-describedby={`desc-${props.id}`}
      rows={props.rows}
      cols={props.cols}
      required={props.required}
      value={props.value}
      onChange={props.handleChange} >
    </textarea>
    {props.helpText && <p className="help-text" aria-describedby={`desc-${props.id}`}>{props.helpText}</p>}
  </div>
)

TextAreaInput.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  handleChange: PropTypes.func,
  helpText: PropTypes.string,
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
    <InputLabel {...props} />
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
    <InputLabel {...props} />
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
