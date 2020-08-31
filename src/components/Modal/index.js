import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button";
import Captcha from "../Captcha";
import {CheckBoxInput, DatePickerInput, EmailInput, SelectInput, SelectOption, TextInput, TextAreaInput} from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import {ModalSavedItemList} from "../SavedItem";
import "./styles.scss"


const FormGroup = ({ component, error, label, type, name, rows}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Field type={type} name={name} component={component} rows={rows} />
    { error && <ErrorMessage name={name} component="div" className="modal-form__error" />}
  </div>
)

FormGroup.propTypes = {
  component: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
}


const FormButtons = ({ isSubmitting, submitText, toggleModal }) => (
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

const MyListModal = (props) => (
  // TODO: replace captcha key
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className="modal-content"
    overlayClassName="modal-overlay">
    <div className="modal-header">
      <h2 className="modal-header__title">{props.title}</h2>
      <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
        <MaterialIcon icon="close"/>
      </button>
    </div>
    <div className="modal-body">
      <div className="modal-list">
        <ModalSavedItemList items={props.list} />
      </div>
      <div className="modal-form">
        {props.form}
      </div>
    </div>
  </Modal>
)

MyListModal.propTypes = {
  appElement: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export class EmailModal extends Component {
  componentDidMount() {
    // TODO: what should we do if this request fails?
    axios
      .post("http://request-broker/api/process-request/email", this.props.data)
      .then(res => { this.setState({ data: res.data}) })
      .catch(err => console.log(err))
  }
  handleSubmit = (submitted) => {
    const data = Object.assign({}, submitted, {
      "email": submitted.email,
      "subject": submitted.subject,
      "message": submitted.message
    });
    axios
      .post("http://request-broker/api/deliver-request/email", data)
      .then(res => { this.props.toggleModal(); })
      .catch(err => {
        let msg = err.response ? err.response : "An unknown error occurred."
        this.props.handleError(msg, "email");
      }
    );
  }
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Email List"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        list={this.props.list}
        form={
          <Formik
            initialValues={{email: "", subject: "", message: "", recaptcha: ""}}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'This field is required.';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address.';
              }
              if (!values.recaptcha) {
                errors.recaptcha = 'This field is required.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.handleSubmit(values);
              setSubmitting(false);
            }}
          >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <FormGroup label="Email *" name="email" type="email" error={true} />
              <FormGroup label="Subject" name="subject" type="text" />
              <FormGroup label="Message" name="message" component="textarea" rows={5} />
              <Field component={Captcha} name="recaptcha" className="modal-form__captcha" handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
              <ErrorMessage name="recaptcha" component="div" className="modal-form__error" />
              <FormButtons submitText="Send List" toggleModal={this.props.toggleModal} isSubmitting={isSubmitting} />
            </Form>
          )}
          </Formik>
        }
      />
    )
  }
}

EmailModal.propTypes = {
  appElement: PropTypes.object,
  handleError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
}

export class ReadingRoomRequestModal extends Component {
  constructor(props)  {
    super(props)
    this.state  = {
      "data": {},
      "scheduledDate": new Date().toISOString().substring(0, 10),
      "questions": "",
      "notes": ""
    }
  }
  componentDidMount() {
    // TODO: what should we do if this request fails?
    axios
      .post("http://request-broker/api/process-request/parse", this.props.data)
      .then(res => { this.setState({ data: res.data}) })
      .catch(err => console.log(err))
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = Object.assign({}, this.state.data, {
      "scheduledDate": this.state.scheduledDate,
      "questions": this.state.questions,
      "notes": this.state.notes
    });
    axios
      .post("http://request-broker/api/deliver-request/reading-room", data)
      .then(res => { this.props.toggleModal(); })
      .catch(err => {
        let msg = err.response ? err.response : "An unknown error occurred."
        this.props.handleError(msg, "readingRoom");
      }
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }
  handleCaptchaChange = value => {
    // TODO: decide if we need this handler or not
    console.log(value)
  }
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Request in Reading Room"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}

        list={this.props.list}
        handleCaptchaChange={this.handleCaptchaChange}
        submitError={this.props.error}
        inputs={
          <React.Fragment>
            <DatePickerInput
              id="scheduledDate"
              name="scheduledDate"
              className="modal-form__input"
              label="Scheduled Date"
              helpText="Enter the date of your research visit"
              required={true}
              value={this.state.scheduledDate}
              handleChange={this.handleChange} />
            <TextAreaInput
              id="questions"
              name="questions"
              className="modal-form__input"
              label="Special Requests/Questions for RAC staff"
              helpText="255 characters maximum"
              rows={5}
              value={this.state.questions}
              handleChange={this.handleChange} />
            <TextAreaInput
              id="notes"
              name="notes"
              className="modal-form__input"
              label="Notes for Personal Reference"
              helpText="255 characters maximum"
              rows={5}
              value={this.state.notes}
              handleChange={this.handleChange} />
          </React.Fragment>
        }
        buttons={
          <React.Fragment>
            <Button
              className="btn--orange btn--sm"
              type="submit"
              value="submit"
              label={`Request ${this.props.list.length ? (this.props.list.length) : ""} Items`}
              handleClick={this.handleSubmit}
              disabled={this.state.submitDisabled} />
            <Button
              className="btn--gray btn--sm"
              type="reset"
              label="Cancel"
              handleClick={this.props.toggleModal} />
          </React.Fragment>
        }
      />
    )
  }
}

ReadingRoomRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
}


export class DuplicationRequestModal extends Component {
  constructor(props)  {
    super(props)
    this.state  = {
      "data": {},
      "format": "jpeg",
      "description": "Entire folder",
      "questions": "",
      "notes": "",
      "costs": false
    }
  }
  componentDidMount() {
    // TODO: what should we do if this request fails?
    axios
      .post("http://request-broker/api/process-request/parse", this.props.data)
      .then(res => { this.setState({ data: res.data}) })
      .catch(err => console.log(err))
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = Object.assign({}, this.state.data, {
      "format": this.state.format,
      "description": this.state.description,
      "questions": this.state.questions,
      "notes": this.state.notes,
      "costs": this.state.costs
    });
    axios
      .post("http://request-broker/api/deliver-request/duplication", data)
      .then(res => { this.props.toggleModal(); })
      .catch(err => {
        let msg = err.response ? err.response : "An unknown error occurred."
        this.props.handleError(msg, "duplication");
      }
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }
  handleCaptchaChange = value => {
    // TODO: decide if we need this handler or not
    console.log(value)
  }
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Request Copies"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        list={this.props.list}
        handleCaptchaChange={this.handleCaptchaChange}
        submitError={this.props.error}
        inputs={
          <React.Fragment>
            <SelectInput
              id="format"
              name="format"
              className="modal-form__input"
              label="Format"
              required={true}
              value={this.state.format}
              handleChange={this.handleChange} >
                <SelectOption label="JPEG" />
                <SelectOption label="PDF" />
                <SelectOption label="Photocopy" />
                <SelectOption label="TIFF" />
            </SelectInput>
            <TextAreaInput
              id="description"
              name="description"
              className="modal-form__input"
              label="Description of Materials"
              helpText="Please describe the materials you want reproduced"
              rows={5}
              value={this.state.description}
              handleChange={this.handleChange} />
            <TextAreaInput
              id="questions"
              name="questions"
              className="modal-form__input"
              label="Special Requests/Questions for RAC staff"
              helpText="255 characters maximum"
              rows={5}
              value={this.state.questions}
              handleChange={this.handleChange} />
            <TextAreaInput
              id="notes"
              name="notes"
              className="modal-form__input"
              label="Notes for Personal Reference"
              helpText="255 characters maximum"
              rows={5}
              value={this.state.notes}
              handleChange={this.handleChange} />
            <CheckBoxInput
              id="costs"
              name="costs"
              className="modal-form__input"
              label={<>I agree to pay the duplication costs for this request. See our <a href="https://rockarch.org/collections/access-and-request-materials/#duplication-services-and-fee-schedule">fee schedule</a></>}
              required={true}
              checked={this.state.costs}
              handleChange={this.handleChange} />
          </React.Fragment>
        }
        buttons={
          <React.Fragment>
            <Button
              className="btn--orange btn--sm"
              type="submit"
              value="submit"
              label={`Request ${this.props.list.length ? (this.props.list.length) : ""} Items`}
              handleClick={this.handleSubmit}
              disabled={this.state.submitDisabled} />
            <Button
              className="btn--gray btn--sm"
              type="reset"
              label="Cancel"
              handleClick={this.props.toggleModal} />
          </React.Fragment>
        }
      />
    )
  }
}

DuplicationRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
}
