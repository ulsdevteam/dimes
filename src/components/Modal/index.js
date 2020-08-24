import React, { Component } from 'react';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button";
import {EmailInput, TextInput, TextAreaInput} from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import {ModalSavedItemList} from "../SavedItem";
import "./styles.scss"

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
        <form>
          <div className="modal-form__input-group">
            {props.inputs}
          </div>
          <div className="modal-form__captcha">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={props.handleCaptchaChange} />
          </div>
          <div className="modal-form__buttons">
            {props.buttons}
            {props.submitError && <p className="modal-error">{props.submitError}</p>}
          </div>
        </form>
      </div>
    </div>
  </Modal>
)

MyListModal.propTypes = {
  appElement: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleCaptchaChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  inputs: PropTypes.node.isRequired,
  buttons: PropTypes.node.isRequired
}

export class EmailModal extends Component {
  // TODO: should buttons be inputs instead?
  // This would allow us to move the onClick handler for the button
  // to the form as a onSubmit handler.
  constructor(props)  {
    super(props)
    this.state  = {
      "email": "",
      "subject":  "",
      "message": "",
      "submitDisabled": true,
      "data": {},
    }
  }
  componentDidMount() {
    // TODO: what should we do if this request fails?
    axios
      .post("http://request-broker/api/process-request/email", this.props.data)
      .then(res => { this.setState({ data: res.data}) })
      .catch(err => console.log(err))
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = Object.assign({}, this.state.data, {
      "email": this.state.email,
      "subject": this.state.subject,
      "message": this.state.message
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
  handleChange = event => {
    let name = event.target.name
    this.setState({ [name]: event.target.value});
  }
  handleCaptchaChange = value => {
    this.setState({ submitDisabled: false })
  }
  render() {
    return (
      <MyListModal
        appElement={this.props.appElement}
        title="Email List"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        contentLabel="Email List"
        list={this.props.list}
        handleCaptchaChange={this.handleCaptchaChange}
        submitError={this.props.submitError}
        inputs={
          <React.Fragment>
            <EmailInput
              id="email"
              name="email"
              className="modal-form__input"
              label="Email Address"
              required={true}
              value={this.state.email}
              handleChange={this.handleChange} />
            <TextInput
              id="subject"
              name="subject"
              className="modal-form__input"
              type="text"
              label="Subject Line"
              value={this.state.subject}
              handleChange={this.handleChange} />
            <TextAreaInput
              id="message"
              name="message"
              className="modal-form__input"
              label="Message"
              rows={5}
              value={this.state.message}
              handleChange={this.handleChange} />
          </React.Fragment>
        }
        buttons={
          <React.Fragment>
            <Button
              className="btn--orange btn--sm"
              type="submit"
              value="submit"
              label="Send List"
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

EmailModal.propTypes = {
  appElement: PropTypes.object,
  handleError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
}
