import React from "react";
import PropTypes from "prop-types";
import {
  DatePicker,
  DatePickerInput,
  DatePickerMonth,
  DatePickerTable,
  DatePickerButton,
  DatePickerCalendar} from "@reecelucas/react-datepicker";
import MaterialIcon from "../MaterialIcon";
import "./styles.scss";


const InputLabel = ({className, id, label, required}) => (
  <label htmlFor={id} className={className}>
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
  <>
    <input
      type="checkbox"
      className={`checkbox ${props.className ? props.className : ""}`}
      id={props.id}
      name={props.name ? props.name : props.id}
      onChange={props.handleChange}
      checked={props.checked}
      required={props.required} />
    <InputLabel {...props} />
  </>
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
  name: PropTypes.string,
  required: PropTypes.bool
};

CheckBoxInput.defaultProps = {
  checked: true,
}

export const DateInput = (props) => (
  <>
  <DatePicker
      className="dp__wrapper"
      initialDate={new Date()}
      minDate={new Date()}
      onSelect={date => props.handleChange(date)}>
    <label htmlFor={props.id}>{props.label}</label>
    <DatePickerInput
      className="dp__input"
      dateFormat={'MM/dd/yyyy'}
      id={props.id}
      name={props.name} />
    <DatePickerCalendar className="dp__calendar">
      <div className="dp__top-bar">
        <DatePickerButton
          className="dp__button"
          aria-label="Switch to the previous month."
          updateMonth={({ prev }) => prev()} >
          <MaterialIcon icon="west" />
        </DatePickerButton>
        <DatePickerMonth className="dp__month" />
        <DatePickerButton
          className="dp__button"
          aria-label="Switch to the next month."
          updateMonth={({ next }) => next()} >
          <MaterialIcon icon="east" />
        </DatePickerButton>
      </div>
      <DatePickerTable className="dp__table" />
    </DatePickerCalendar>
  </DatePicker>
  {props.helpText && <p className="help-text" aria-describedby={`desc-${props.id}`}>{props.helpText}</p>}
  </>
)

DateInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const SelectInput = (props) => (
  <div className={props.className} required={props.required}>
    <InputLabel {...props} />
    <select
      name={props.id}
      id={props.id}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.handleChange}>
        {props.children}
    </select>
    <MaterialIcon icon="unfold_more" />
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
  <option value={value} >
    {label}
  </option>
)

SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
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
      defaultValue={props.defaultValue}
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
      name={props.name ? props.name : props.id}
      onChange={props.handleChange}
      value={props.value}
      defaultValue={props.defaultValue}
      required={props.required} />
  </div>
)

YearInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
