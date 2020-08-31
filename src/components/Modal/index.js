import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Captcha from "../Captcha";
import MaterialIcon from "../MaterialIcon";
import {ModalSavedItemList} from "../SavedItem";
import "./styles.scss"


const FormGroup = ({ children, component, error, helpText, label, type, name, rows}) => (
  <div className="form-group">
    { type !== "checkbox" && <label htmlFor={name}>{label}</label> }
    <Field type={type} name={name} component={component} rows={rows} children={children} />
    { type === "checkbox" && <label htmlFor={name}>{label}</label> }
    { helpText && <p className="help-text" aria-describedby={`desc-${name}`}>{helpText}</p> }
    { error && <ErrorMessage name={name} component="div" className="modal-form__error" /> }
  </div>
)

FormGroup.propTypes = {
  children: PropTypes.array,
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
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Request in Reading Room"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        list={this.props.list}
        form={
          <Formik
            initialValues={{scheduledDate: "", questions: "", notes: "", recaptcha: ""}}
            validate={values => {
              const errors = {};
              if (!values.scheduledDate) {
                errors.scheduledDate = 'This field is required.';
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
              <FormGroup label="Scheduled Date *" name="scheduledDate" type="date" error={true} helpText="Enter the date of your research visit" />
              <FormGroup label="Special Requests/Questions for RAC staff" helpText="255 characters maximum" name="questions" component="textarea" rows={5} />
              <FormGroup label="Notes for Personal Reference" helpText="255 characters maximum" name="notes" component="textarea" rows={5} />
              <Field component={Captcha} name="recaptcha" className="modal-form__captcha" handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
              <ErrorMessage name="recaptcha" component="div" className="modal-form__error" />
              <FormButtons submitText={`Request ${this.props.list.length ? (this.props.list.length) : ""} Items`} toggleModal={this.props.toggleModal} isSubmitting={isSubmitting} />
            </Form>
          )}
          </Formik>
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
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Request Copies"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        list={this.props.list}
        form={
          <Formik
            initialValues={{format: "", description: "Entire folder", questions: "", notes: "", costs: false, recaptcha: ""}}
            validate={values => {
              const errors = {};
              if (!values.format) {
                errors.format = 'This field is required.';
              }
              if (!values.recaptcha) {
                errors.recaptcha = 'This field is required.';
              }
              if (!values.costs) {
                errors.costs = "We cannot process your request unless you agree to pay the costs of reproduction.";
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
              <FormGroup
                label="Format *"
                name="format"
                component="select"
                error={true}
                children={[
                  <option value="">Select a format</option>,
                  <option value="JPEG">JPEG</option>,
                  <option value="PDF">PDF</option>,
                  <option value="Photocopy">Photocopy</option>,
                  <option value="TIFF">TIFF</option>
                ]}/>
              <FormGroup label="Description of Materials" helpText="Please describe the materials you want reproduced" name="description" component="textarea" rows={5} />
              <FormGroup label="Special Requests/Questions for RAC staff" helpText="255 characters maximum" name="questions" component="textarea" rows={5} />
              <FormGroup label="Notes for Personal Reference" helpText="255 characters maximum" name="notes" component="textarea" rows={5} />
              <FormGroup
                label={<>I agree to pay the duplication costs for this request. See our <a href="https://rockarch.org/collections/access-and-request-materials/#duplication-services-and-fee-schedule">fee schedule</a></>}
                name="costs"
                type="checkbox"
                error={true} />
              <Field component={Captcha} name="recaptcha" className="modal-form__captcha" handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
              <ErrorMessage name="recaptcha" component="div" className="modal-form__error" />
              <FormButtons submitText={`Request ${this.props.list.length ? (this.props.list.length) : ""} Items`} toggleModal={this.props.toggleModal} isSubmitting={isSubmitting} />
            </Form>
          )}
          </Formik>
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
