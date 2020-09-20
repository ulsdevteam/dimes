import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button";
import Captcha from "../Captcha";
import CollectionHits from "../CollectionHits";
import Facet from "../Facet";
import { FocusError, FormButtons, FormGroup } from "../Form";
import { CheckBoxInput, YearInput } from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import { ModalSavedItemList } from "../SavedItem";
import "./styles.scss"


const MyListModal = (props) => (
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
        <ModalSavedItemList items={props.list} handleChange={props.handleChange} />
      </div>
      <div className="modal-form">
        {props.form}
      </div>
    </div>
  </Modal>
)

MyListModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export const EmailModal = props => (
  <MyListModal
    appElement={props.appElement}
    title="Email List"
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
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
          if (!values.recaptcha) {
            errors.recaptcha = 'Please complete this field.';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.handleFormSubmit(
            `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/email`, values, "email");
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field
            type="hidden"
            name="items"
            value={props.submitList} />
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
          <Field
            component={Captcha}
            name="recaptcha"
            handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
          <ErrorMessage
            id="recaptcha-error"
            name="recaptcha"
            component="div"
            className="modal-form__error" />
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
  toggleModal: PropTypes.func.isRequired,
}

export const ReadingRoomRequestModal = props => (
  <MyListModal
    appElement={props.appElement}
    title="Request in Reading Room"
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        initialValues={{scheduledDate: "", questions: "", notes: "", items: props.submitList, recaptcha: ""}}
        validate={values => {
          const errors = {};
          if (!values.scheduledDate) errors.scheduledDate = 'Please provide the date of your research visit.';
          if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.handleFormSubmit(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/reading-room`, values, "readingRoom");
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field
            type="hidden"
            name="items"
            value={props.submitList} />
          <FormGroup
            label="Scheduled Date *"
            helpText="Enter the date of your research visit"
            name="scheduledDate"
            type="date"
            required={true}
            errors={errors}
            touched={touched} />
          <FormGroup
            label="Special Requests/Questions for RAC staff"
            helpText="255 characters maximum"
            name="questions"
            maxLength={255}
            component="textarea"
            rows={5} />
          <FormGroup
            label="Notes for Personal Reference"
            helpText="255 characters maximum"
            name="notes"
            maxLength={255}
            component="textarea"
            rows={5} />
          <Field
            component={Captcha}
            name="recaptcha"
            handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
          <ErrorMessage
            id="recaptcha-error"
            name="recaptcha"
            component="div"
            className="modal-form__error" />
          <FormButtons
            submitText={`Request ${props.list.length ? (props.list.length) : ""} Items`}
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
  toggleModal: PropTypes.func.isRequired,
}


export const DuplicationRequestModal = props => (
  <MyListModal
    appElement={props.appElement}
    title="Request Copies"
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.handleFormSubmit(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/deliver-request/duplication`, values, "duplication");
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <Field
            type="hidden"
            name="items"
            value={props.submitList} />
          <FormGroup
            label="Format *"
            name="format"
            component="select"
            children={[
              <option key="1" value="">Select a format</option>,
              <option key="2" value="JPEG">JPEG</option>,
              <option key="3" value="PDF">PDF</option>,
              <option key="4" value="Photocopy">Photocopy</option>,
              <option key="5" value="TIFF">TIFF</option>]}
            required={true}
            errors={errors}
            touched={touched} />
          <FormGroup
            label="Description of Materials"
            helpText="Please describe the materials you want reproduced. 255 characters maximum."
            name="description"
            maxLength={255}
            component="textarea"
            rows={5} />
          <FormGroup
            label="Special Requests/Questions for RAC staff"
            helpText="255 characters maximum."
            maxLength={255}
            name="questions"
            component="textarea"
            rows={5} />
          <FormGroup
            label="Notes for Personal Reference"
            helpText="255 characters maximum."
            maxLength={255}
            name="notes"
            component="textarea"
            rows={5} />
          <FormGroup
            label={<>I agree to pay the duplication costs for this request. See our <a href="https://rockarch.org/collections/access-and-request-materials/#duplication-services-and-fee-schedule">fee schedule</a></>}
            name="costs"
            type="checkbox"
            required={true}
            errors={errors}
            touched={touched} />
          <Field
            component={Captcha}
            name="recaptcha"
            handleCaptchaChange={(response) => setFieldValue("recaptcha", response)} />
          <ErrorMessage
            id="captcha-error"
            name="recaptcha"
            component="div"
            className="modal-form__error" />
          <FormButtons
            submitText={`Request ${props.list.length ? (props.list.length) : ""} Items`}
            toggleModal={props.toggleModal}
            isSubmitting={isSubmitting} />
          <FocusError />
        </Form>
      )}
      </Formik>
    }
  />
)

DuplicationRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export const FacetModal = props => {
  var [startYear, setStartYear] = useState(0);
  var [endYear, setEndYear] = useState(0);

  useEffect(() => {
    const startDate = (props.params.start_date__gte ? props.params.start_date__gte : (props.data.min_date && props.data.min_date.value_as_string)) || "";
    const endDate = (props.params.end_date__lte ? props.params.end_date__lte : (props.data.max_date && props.data.max_date.value_as_string)) || "";
    setStartYear(startDate);
    setEndYear(endDate);
  }, [props.params.start_date__gte, props.params.end_date__lte, props.data.min_date, props.data.max_date] );

  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className="modal-content--facet"
      overlayClassName={{
        base: "modal-overlay--facet slide--right",
        afterOpen: "slide--right--after-open",
        beforeClose: "slide--right--before-close"
      }}
      closeTimeoutMS={200} >
      <div className="modal-header--search">
        <h2 className="modal-header__title">Filter Search Results</h2>
        <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
          <MaterialIcon icon="close"/>
        </button>
      </div>
      <div className="modal-body">
        <Facet>
          <CheckBoxInput
            id="online"
            name="true"
            className="facet__input"
            checked={props.params.online === "true"}
            handleChange={e => props.handleChange(e, "online")}
            label={`Show me digital materials only (${props.data.online && props.data.online.doc_count})`} />
        </Facet>
        <Facet title="Date Range">
          <YearInput
            id="startYear"
            label="Start Year"
            className="hide-label"
            handleChange={e => {setStartYear(e.target.value)}}
            value={startYear} />
          <YearInput
            id="endYear"
            label="End Year"
            className="hide-label"
            handleChange={e => {setEndYear(e.target.value)}}
            value={endYear} />
          <Button className="btn--sm btn--blue" label="apply" handleClick={() => {props.handleDateChange(startYear, endYear)}}/>
        </Facet>
        <Facet
          handleChange={props.handleChange}
          items={props.data.format}
          paramKey="genre"
          params={props.params.genre}
          title="Format" />
        <Facet
          handleChange={props.handleChange}
          items={props.data.creator}
          paramKey="creator"
          params={props.params.creator}
          title="Creator" />
        <Facet
          handleChange={props.handleChange}
          items={props.data.subject}
          paramKey="subject"
          params={props.params.subject}
          title="Subject" />
      </div>
    </Modal>
  )
}

FacetModal.propTypes = {
  appElement: PropTypes.object,
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export const CollectionHitsModal = props => {
  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className="modal-content--hits"
      overlayClassName={{
        base: "modal-overlay--hits slide--left",
        afterOpen: "slide--left--after-open",
        beforeClose: "slide--left--before-close"
      }}
      closeTimeoutMS={200} >
      <div className="modal-header--search">
        <h2 className="modal-header__title">Inside This Collection</h2>
        <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
          <MaterialIcon icon="close"/>
        </button>
      </div>
      <div className="modal-body">
        <CollectionHits collection={props.data} isLoading={props.isLoading} />
      </div>
    </Modal>
  )
}

CollectionHitsModal.propTypes = {
  appElement: PropTypes.object,
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
