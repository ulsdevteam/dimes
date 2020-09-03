import React, { useEffect } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import PropTypes from "prop-types";


export const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`;
        const errorElement = document.querySelector(selector);
        if (errorElement) {
          errorElement.focus();
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return null;
};


export const FormGroup = (props) => {
  const { children, component, errors, helpText, maxLength, label, name, required, rows, touched, type } = props;
  return (
    <div className="form-group">
      { type !== "checkbox" && <label htmlFor={name}>{label}</label> }
      <Field
        tabIndex="0"
        className={ errors && errors[name] && touched[name] ? "is-invalid" : null }
        type={type}
        name={name}
        id={name}
        component={component}
        rows={rows}
        children={children}
        maxLength={maxLength}
        aria-invalid={errors && errors[name] && touched[name] ? 'true' : null}
        aria-describedby={errors && errors[name] && touched[name] ? `${name}-error` : null}
        aria-required={required} />
      { type === "checkbox" && <label htmlFor={name}>{label}</label> }
      { helpText && <p className="help-text" aria-describedby={`desc-${name}`}>{helpText}</p> }
      <ErrorMessage id={`${name}-error`} name={name} component="div" className="modal-form__error" />
    </div>
)}

FormGroup.propTypes = {
  children: PropTypes.array,
  component: PropTypes.string,
  hasErrorMsg: PropTypes.bool,
  errors: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rows: PropTypes.number,
  touched: PropTypes.object,
  type: PropTypes.string,
}


export const FormButtons = ({ isSubmitting, submitText, toggleModal }) => (
  <div className="modal-form__buttons">
    <button type="submit" disabled={isSubmitting} className="btn btn--orange btn--sm">
      {submitText}
    </button>
    <button type="reset" className="btn btn--gray btn--sm" onClick={toggleModal}>
      Cancel
    </button>
  </div>
)

FormButtons.propTypes = {
  isSubmitting: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
}
