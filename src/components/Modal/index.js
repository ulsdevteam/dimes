import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import Button from "../Button";
import {TextInput, TextAreaInput} from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import {ModalSavedItemList} from "../SavedItem";
import "./styles.scss"

Modal.setAppElement("#root");

class MyListModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className="modal-content"
        overlayClassName="modal-overlay">
        <div className="modal-header">
          <h2 className="modal-header__title">{this.props.title}</h2>
          <button className="modal-header__button" onClick={this.props.toggleModal}>
            <MaterialIcon icon="close"/>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-list">
            <ModalSavedItemList items={this.props.list} />
          </div>
          <div className="modal-form">
            <form>
              <div className="modal-form__input-group">
                {this.props.inputs}
              </div>
              <div className="modal-form__captcha">
                <ReCAPTCHA
                  sitekey="Your client site key"
                  onChange={this.handleCaptchaChange} />
              </div>
              <div className="modal-form__buttons">
                {this.props.buttons}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}

MyListModal.propTypes = {
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
      "message": ""
    }
  }
  handleSubmit = event => {
    // TODO: do something with this.state, which contains form data
    event.preventDefault();
    this.props.toggleModal();
  }
  handleChange = event => {
    let name = event.target.name
    this.setState({ [name]: event.target.value});
  }
  handleCaptchaChange = value => {
    // TODO: enable submit button
    console.log(value)
  }
  render() {
    return (
      <MyListModal
        title="Email List"
        isOpen={this.props.isOpen}
        toggleModal={this.props.toggleModal}
        contentLabel="Email List"
        list={this.props.list}
        handleCaptchaChange={this.handleCaptchaChange}
        inputs={
          <React.Fragment>
            <TextInput
              id="email"
              name="email"
              className="modal-form__input"
              type="text"
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
              onClick={this.handleSubmit} />
            <Button
              className="btn--gray btn--sm"
              type="reset"
              label="Cancel"
              onClick={this.props.toggleModal} />
          </React.Fragment>
        }
      />
    )
  }
}

EmailModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}
