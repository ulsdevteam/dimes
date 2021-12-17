import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import Button from '../Button'
import Modal from 'react-modal'
import Captcha from '../Captcha'
import { FocusError, FormButtons, FormGroup } from '../Form'
import { DateInput, SelectInput } from '../Inputs'
import MaterialIcon from '../MaterialIcon'
import { ModalSavedItemList } from '../ModalSavedItem'
import { getFormattedDate } from '../Helpers'
import './styles.scss'


const SubmitListInput = ({ submitList }) => {

  const { setFieldValue } = useFormikContext();

  /** Sets value of hidden items input */
  useEffect(() => {
    setFieldValue('items', submitList)
  }, [setFieldValue, submitList])

  return (
    <Field
      type='hidden'
      name='items'/>
  )
}


const FormatSelectInput = () => {
  const { setFieldValue } = useFormikContext();
  const [format, setFormat] = useState('')

  const formatOptions = [
    {value: '', label: 'Select a format'},
    {value: 'Digital Image ', label: 'Digital Image'},
    {value: 'Photographic Print ', label: 'Photographic Print'},
    {value: 'Audio/Video/Film', label: 'Audio/Video/Film'},
    {value: 'Photocopy/Quickscan', label: 'Photocopy/Quickscan'}
  ]

  useEffect(() => {
    setFieldValue('format', format)
  }, [format, setFieldValue])

  return (
    <div className='form-group'>
      <SelectInput
        className='select__modal'
        id='format'
        label='Format'
        name='format'
        onChange={({selectedItem}) => setFormat(selectedItem.value)}
        options={formatOptions}
        required={true}
        selectedItem={format || ''} />
      <ErrorMessage
        id='format-error'
        name='format'
        component='div'
        className='modal-form__error' />
    </div>
  )
}

export const ModalToggleListButton = ({ ignoreRestrictions, items, toggleList }) => {

  /** Returns false if any items are unchecked */
  const allSelected = useCallback(
    () => {
      if (ignoreRestrictions) {
        return items.filter(g => g.items.filter(i => !i.isChecked).length).length ? false : true
      } else {
        return items.filter(g => g.items.filter(i => i.submit && !i.isChecked).length).length ? false : true
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  )

  const [deselect, setDeselect] = useState(allSelected());

  useEffect(() => {
    setDeselect(allSelected())
  }, [allSelected, items])

  return (
    <Button
      className='btn--sm btn--gray'
      handleClick={() => toggleList(!deselect, ignoreRestrictions)}
      label={deselect ? 'Deselect all items' : 'Select all items'}
      ariaLabel={deselect ? 'Deselect all items' : 'Select all items'}
      ariaPressed={deselect}
      iconBefore={deselect ? 'check_box_outline_blank' : 'check_box'} />
  )
}

/** Calculates total extent of selected items
* Only checked items are included in this calculation. A default of '1 item' is
* provided for items with no extents (which usually means no instance).
*/
export const SelectedTotals = ({ items }) => {
  const selectedExtents = items.map(
    g => g.items.filter(i => i.isChecked).map(
      i => i.extents ? i.extents: {'type': 'item', 'value': 1} )).flat(2)
  const totals = selectedExtents.reduce((total, current) => (
    total[current.type] ?
      {...total, [current.type]: total[current.type] + parseFloat(current.value)} :
      {...total, [current.type]: parseFloat(current.value)}
  ), {})
  const extents = Object.entries(totals).map(e => pluralize(e[0], e[1], true))
  return (extents.length ? <p className='selected-totals'>{`selected: ${extents.join(', ')}`}</p> : <p className='selected-totals'>selected: 0 items</p>)
}


export const ModalMyList = props => (
  <Modal
    appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal}
    className='modal-content'
    overlayClassName='modal-overlay'>
    <div className='modal-header'>
      <h2 className='modal-header__title'>{props.title}</h2>
      <button className='modal-header__button' aria-label='Close' onClick={props.toggleModal}>
        <MaterialIcon icon='close'/>
      </button>
    </div>
    <div className='modal-body'>
      <div className='modal-list'>
        <ModalToggleListButton
          ignoreRestrictions={props.ignoreRestrictions}
          items={props.list}
          toggleList={props.toggleList} />
        <SelectedTotals items={props.list} />
        <ModalSavedItemList
          ignoreRestrictions={props.ignoreRestrictions}
          items={props.list}
          handleChange={props.handleChange}
          setSubmit={props.setSubmit} />
        <SelectedTotals items={props.list} />
      </div>
      <div className='modal-form'>
        {props.form}
      </div>
    </div>
  </Modal>
)

ModalMyList.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

ModalMyList.defaultProps = {
  ignoreRestrictions: false,
}


export const EmailModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title='Email List'
    handleChange={props.handleChange}
    ignoreRestrictions={true}
    isOpen={props.isOpen}
    setSubmit={props.setSubmit}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        initialValues={{email: '', subject: '', message: '', items: props.submitList, recaptcha: ''}}
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
            `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/email`,
            values,
            'email');
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <SubmitListInput submitList={props.submitList} />
          <ErrorMessage
            id='items-error'
            name='items'
            component='div'
            className='modal-form__error' />
          <FormGroup
            label='Email *'
            name='email'
            type='email'
            required={true}
            errors={errors}
            touched={touched} />
          <FormGroup
            label='Subject'
            name='subject'
            type='text' />
          <FormGroup
            label='Message'
            name='message'
            component='textarea'
            rows={5} />
          <div className='form-group'>
            <Field
              component={Captcha}
              name='recaptcha'
              handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
            <ErrorMessage
              id='recaptcha-error'
              name='recaptcha'
              component='div'
              className='modal-form__error' />
          </div>
          <FormButtons
            submitText='Send List'
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
  setSubmit: PropTypes.func.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

const ReadingRoomSelect = () => {
  const { setFieldValue } = useFormikContext();
  const [site, setSite] = useState('')

  const ReadingRoomLocations = [
   { value: "", label: "Please select a reading room"},
   { value: "ASCHILLMAN", label: "A&SC Hillman Library 320"},
   { value: "ASCTHOMAS", label: "A&SC Thomas Boulevard"},
   { value: "CAMUSIC", label: "Center for American Music Reading Room"}
  ];

  useEffect(() => {
    setFieldValue('site', site)
  }, [site, setSite])

  return (
    <div className='form-group'>
      <SelectInput
        className='select__modal'
        id='site'
        label='Select Reading Room Location'
        name='site'
        onChange={({selectedItem}) => setSite(selectedItem.value)}
        options={ReadingRoomLocations}
        required={true}
        selectedItem={site || ''} />
      <ErrorMessage
        id='site-error'
        name='site'
        component='div'
        className='modal-form__error' />
    </div>
  )
}

export const ReadingRoomRequestModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title='Request in Reading Room'
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    setSubmit={props.setSubmit}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <Formik
        initialValues={{scheduledDate: new Date(), questions: '', notes: '', readingRoomID: '', site: '', items: props.submitList, recaptcha: ''}}
        validate={values => {
          const errors = {};
          if (!values.scheduledDate) errors.scheduledDate = 'Please provide the date of your research visit.';
          if (!values.site) errors.site = 'Please select a location of a reading room.';
          if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
          if (!values.items.length) errors.items = 'No items have been selected to submit.'
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          /* In order for Aeon to accept requests, dates need to be formatted as MM/DD/YYYY */
          values.scheduledDate = getFormattedDate(values.scheduledDate)
          props.handleFormSubmit(
           `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/reading-room`,
            values,
            'readingRoom');
          setSubmitting(false);
        }}
      >
      {({ errors, isSubmitting, setFieldValue, touched }) => (
        <Form>
          <SubmitListInput submitList={props.submitList} />
          <ErrorMessage
            id='items-error'
            name='items'
            component='div'
            className='modal-form__error' />
          <div className='form-group'>
            <Field
              component={DateInput}
              handleChange={date => setFieldValue('scheduledDate', date)}
              helpText='Enter the date of your research visit (mm/dd/yyyy)'
              id='scheduledDate'
              label='Scheduled Date *'
              type='date' />
            <ErrorMessage
              id='scheduledDate-error'
              name='scheduledDate'
              component='div'
              className='modal-form__error' />
          </div>
          <ReadingRoomSelect />
          <FormGroup
            label='Message for Pitt staff'
            helpText='255 characters maximum'
            name='questions'
            maxLength={255}
            component='textarea'
            rows={5} />
          <div className='form-group'>
            <Field
              component={Captcha}
              name='recaptcha'
              handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
            <ErrorMessage
              id='recaptcha-error'
              name='recaptcha'
              component='div'
              className='modal-form__error' />
          </div>
          <FormButtons
            submitText={`Request ${props.submitList.length ? (props.submitList.length) : '0'} ${props.submitList.length !== 1 ? 'Items' : 'Item'}`}
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
  setSubmit: PropTypes.func.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}


export const DuplicationRequestModal = props => (
  <ModalMyList
    appElement={props.appElement}
    title='Request Copies'
    handleChange={props.handleChange}
    isOpen={props.isOpen}
    setSubmit={props.setSubmit}
    toggleList={props.toggleList}
    toggleModal={props.toggleModal}
    list={props.list}
    form={
      <>
        <div className='modal-form__intro'>
          <strong>Please note:</strong> if you want a cost estimate for your order, email an archivist at <a href='mailto:archive-ref@pitt.edu'>archive-ref@pitt.edu</a>.
        </div>
        <Formik
          initialValues={{
            format: '',
            description: 'Entire folder',
            questions: '',
            notes: '',
	    site: 'ASCTHOMAS',
            confirm: false,
            items: props.submitList,
            recaptcha: ''}}
          validate={values => {
            const errors = {};
            if (!values.format) errors.format = 'Please select your desired duplication format.';
            if (!values.recaptcha) errors.recaptcha = 'Please complete this field.';
            if (!values.confirm) errors.confirm = 'Please check the box to acknowledge that an archivist may not be able to fulfill your requestat this time.';
            if (!values.items.length) errors.items = 'No items have been selected to submit.'
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.handleFormSubmit(
              `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/deliver-request/duplication`,
              values,
              'duplication');
            setSubmitting(false);
          }}
        >
        {({ errors, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <SubmitListInput submitList={props.submitList} />
            <ErrorMessage
              id='items-error'
              name='items'
              component='div'
              className='modal-form__error' />
            <FormatSelectInput />
            <FormGroup
              label='Description of Materials'
              helpText='Please describe the materials you want reproduced. 255 characters maximum.'
              name='description'
              maxLength={255}
              component='textarea'
              rows={5} />
            <FormGroup
              label='Message for Pitt staff'
              helpText='255 characters maximum.'
              maxLength={255}
              name='questions'
              component='textarea'
              rows={5} />
            <FormGroup
              label={<>
                By checking this box, I acknowledge archival staff may not be able to fulfill my request at this time.</>}
              name='confirm'
              type='checkbox'
              required={true}
              errors={errors}
              touched={touched} />
            <div className='form-group'>
              <Field
                component={Captcha}
                name='recaptcha'
                handleCaptchaChange={(response) => setFieldValue('recaptcha', response)} />
              <ErrorMessage
                id='captcha-error'
                name='recaptcha'
                component='div'
                className='modal-form__error' />
            </div>
            <FormButtons
              submitText={`Request ${props.submitList.length ? (props.submitList.length) : '0'} ${props.submitList.length !== 1 ? 'Items' : 'Item'}`}
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

DuplicationRequestModal.propTypes = {
  appElement: PropTypes.object,
  handleChange: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  setSubmit: PropTypes.func.isRequired,
  submitList: PropTypes.array.isRequired,
  toggleList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
