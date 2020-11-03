import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import Button from "../Button";
import Modal from "react-modal";
import Captcha from "../Captcha";
import { FocusError, FormButtons, FormGroup } from "../Form";
import { DateInput, SelectInput } from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import { ModalSavedItemList } from "../ModalSavedItem";
import "./styles.scss"


const ModalToggleListButton = ({items, toggleList}) => {

  /** Returns false if any items are unchecked */
  const allSelected = items => {
    return items.filter(g => g.items.filter(i => !i.isChecked).length).length ? false : true
  }

  const [deselect, setDeselect] = useState(allSelected(items));

  useEffect(() => {
    setDeselect(allSelected(items))
  }, [items])

  return (
    <Button
      className="btn--sm btn--gray"
      handleClick={() => toggleList(!deselect)}
      label={deselect ? "Deselect all items" : "Select all items"}
      iconBefore={deselect ? "check_box_outline_blank" : "check_box"} />
  )
}



const ModalMyList = (props) => (
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
        <ModalToggleListButton items={props.list} toggleList={props.toggleList} />
        <ModalSavedItemList items={props.list} handleChange={props.handleChange} />
      </div>
      <div className="modal-form">
        {props.form}
      </div>
    </div>
  </Modal>
)

ModalMyList.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export const EmailModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title="Email List"
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        enableReinitialize={true}
        initialValues={{email: "", subject: "", message: "", items: props.submitList, recaptcha: ""}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'An email address is required.';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address provided.';
          }
          if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
          if (!values.items.length) errors.items = 'No items have been selected to submit.'
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.handleFormSubmit(
            `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/email`,
            values,
            "email");
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field
            type="hidden"
            name="items"
            value={props.submitList} />
          <ErrorMessage
            id="items-error"
            name="items"
            component="div"
            className="modal-form__error" />
          <FormGroup
            label="Email *"
            name="email"
            type="email"
            required={true}
            errors={errors}
            touched={touched} />
          <FormGroup
            label="Subject"
            name="subject"
            type="text" />
          <FormGroup
            label="Message"
            name="message"
            component="textarea"
            rows={5} />
          <div className="form-group">
            <Field
              component={Captcha}
              name="recaptcha"
              handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
            <ErrorMessage
              id="recaptcha-error"
              name="recaptcha"
              component="div"
              className="modal-form__error" />
          </div>
          <FormButtons
            submitText="Send List"
            toggleModal={props.toggleModal}
            isSubmitting={isSubmitting} />
          <FocusError />
        </Form>
      )}
      </Formik>
    }
  />
)

EmailModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export const ReadingRoomRequestModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title="Request in Reading Room"
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        enableReinitialize={true}
        initialValues={{scheduledDate: new Date(), questions: "", notes: "", items: props.submitList, recaptcha: ""}}
        validate={values => {
          const errors = {};
          if (!values.scheduledDate) errors.scheduledDate = 'Please provide the date of your research visit.';
          if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
          if (!values.items.length) errors.items = 'No items have been selected to submit.'
          console.log(errors)
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.handleFormSubmit(
            `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/reading-room`,
            values,
            "readingRoom");
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field
            type="hidden"
            name="items"
            value={props.submitList} />
          <ErrorMessage
            id="items-error"
            name="items"
            component="div"
            className="modal-form__error" />
          <div className="form-group">
            <Field
              component={DateInput}
              handleChange={date => setFieldValue("scheduledDate", date)}
              helpText="Enter the date of your research visit (mm/dd/yyyy)"
              id="scheduledDate"
              label="Scheduled Date *"
              type="date" />
            <ErrorMessage
              id="scheduledDate-error"
              name="scheduledDate"
              component="div"
              className="modal-form__error" />
          </div>
          <FormGroup
            label="Message for RAC staff"
            helpText="255 characters maximum"
            name="questions"
            maxLength={255}
            component="textarea"
            rows={5} />
          <div className="form-group">
            <Field
              component={Captcha}
              name="recaptcha"
              handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
            <ErrorMessage
              id="recaptcha-error"
              name="recaptcha"
              component="div"
              className="modal-form__error" />
          </div>
          <FormButtons
            submitText={`Request ${props.submitList.length ? (props.submitList.length) : "0"} ${props.submitList.length !== 1 ? "Items" : "Item"}`}
            toggleModal={props.toggleModal}
            isSubmitting={isSubmitting} />
          <FocusError />
        </Form>
      )}
      </Formik>
    }
  />
)

ReadingRoomRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}


export const DuplicationRequestModal = props => {
  const [format, setFormat] = useState("")

  const formatOptions = [
    {value: "", label: "Select a format"},
    {value: "JPEG", label: "JPEG"},
    {value: "PDF", label: "PDF"},
    {value: "Photocopy", label: "Photocopy"},
    {value: "TIFF", label: "TIFF"}
  ]

  return (
    <ModalMyList
      appElement={props.appElement}
      title="Request Copies"
      handleChange={props.handleChange}
      isOpen={props.isOpen}
      toggleList={props.toggleList}
      toggleModal={props.toggleModal}
      list={props.list}
      form={
        <>
          <div className="modal-form__intro">
            <strong>Please note:</strong> if you want a cost estimate for your order, email an archivist at <a href="mailto:archive@rockarch.org">archive@rockarch.org</a>.
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              format: "",
              description: "Entire folder",
              questions: "",
              notes: "",
              costs: false,
              items: props.submitList,
              recaptcha: ""}}
            validate={values => {
              const errors = {};
              if (!values.format) errors.format = 'Please select your desired duplication format.';
              if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
              if (!values.costs) errors.costs = "We cannot process your request unless you agree to pay the costs of reproduction.";
              if (!values.items.length) errors.items = 'No items have been selected to submit.'
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              props.handleFormSubmit(
                `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/duplication`,
                values,
                "duplication");
              setSubmitting(false);
            }}
          >
          {({ errors, isSubmitting, setFieldValue, touched }) => (
            <Form>
              <Field
                type="hidden"
                name="items"
                value={props.submitList} />
              <ErrorMessage
                id="items-error"
                name="items"
                component="div"
                className="modal-form__error" />
              <div className="form-group">
                <SelectInput
                  className="select__search--wrapper"
                  classNamePrefix="select__modal"
                  id="format"
                  label="Format"
                  name="format"
                  onChange={({selectedItem}) => setFormat(selectedItem.value)}
                  options={formatOptions}
                  required={true}
                  selectedItem={format || ""} />
                <ErrorMessage
                  id="format-error"
                  name="forman"
                  component="div"
                  className="modal-form__error" />
              </div>
              <FormGroup
                label="Description of Materials"
                helpText="Please describe the materials you want reproduced. 255 characters maximum."
                name="description"
                maxLength={255}
                component="textarea"
                rows={5} />
              <FormGroup
                label="Message for RAC staff"
                helpText="255 characters maximum."
                maxLength={255}
                name="questions"
                component="textarea"
                rows={5} />
              <FormGroup
                label={<>
                  I agree to pay the duplication costs for this request. See our&nbsp;
                  <a target="_blank"
                    rel="noopener noreferrer"
                    title="opens in a new window"
                    href="https://rockarch.org/collections/access-and-request-materials/#duplication-services-and-fee-schedule">
                    fee schedule
                  </a>.</>}
                name="costs"
                type="checkbox"
                required={true}
                errors={errors}
                touched={touched} />
              <div className="form-group">
                <Field
                  component={Captcha}
                  name="recaptcha"
                  handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
                <ErrorMessage
                  id="captcha-error"
                  name="recaptcha"
                  component="div"
                  className="modal-form__error" />
              </div>
              <FormButtons
                submitText={`Request ${props.submitList.length ? (props.submitList.length) : "0"} ${props.submitList.length !== 1 ? "Items" : "Item"}`}
                toggleModal={props.toggleModal}
                isSubmitting={isSubmitting} />
              <FocusError />
            </Form>
          )}
          </Formik>
        </>
      }
    />
  )
}

DuplicationRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
