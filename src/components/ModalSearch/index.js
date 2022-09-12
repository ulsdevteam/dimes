import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Button from '../Button'
import Facet from '../Facet'
import { YearInput } from '../Inputs'
import './styles.scss'

export const FacetModal = props => {
  var [startYear, setStartYear] = useState(0)
  var [endYear, setEndYear] = useState(0)

  const toArray = value => {
    if (Array.isArray(value)) {
      return value
    } else {
      return [value]
    }
  }

  /** Sets start and end year values */
  useEffect(() => {
    const startDate = (props.params.start_date__gte ? props.params.start_date__gte : (props.data.min_date && props.data.min_date.value)) || ''
    const endDate = (props.params.end_date__lte ? props.params.end_date__lte : (props.data.max_date && props.data.max_date.value)) || ''
    setStartYear(startDate)
    setEndYear(endDate)
  }, [props.params.start_date__gte, props.params.end_date__lte, props.data.min_date, props.data.max_date])

  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement('#root')}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className='modal-content--facet'
      overlayClassName={{
        base: 'modal-overlay--facet slide--right',
        afterOpen: 'slide--right--after-open',
        beforeClose: 'slide--right--before-close'
      }}
      closeTimeoutMS={200} >
      <div className='modal-header--search'>
        <h2 className='modal-header__title' aria-live='polite' aria-atomic='true'>
          {`Filter ${props.resultsCount} Search ${props.resultsCount === 1 ? 'Result': 'Results'}`}
        </h2>
        <Button
          className='btn btn--blue btn--sm'
          aria-label='Close'
          label='Save &amp; Close'
          handleClick={props.toggleModal} />
      </div>
      <div className='modal-body--search'>
        <Facet title='Date Range'>
          <YearInput
            id='startYear'
            label='Start Year'
            className='hide-label'
            handleChange={e => { setStartYear(e.target.value) }}
            value={startYear} />
          <YearInput
            id='endYear'
            label='End Year'
            className='hide-label'
            handleChange={e => { setEndYear(e.target.value) }}
            value={endYear} />
          <Button className='btn btn--sm btn--gray' label='apply dates' handleClick={() => { props.handleDateChange(startYear, endYear) }} />
        </Facet>
        <Facet
          handleChange={props.handleChange}
          items={props.data.format}
          paramKey='genre'
          params={toArray(props.params.genre)}
          title='Format' />
        <Facet
          handleChange={props.handleChange}
          items={props.data.creator}
          paramKey='creator'
          params={toArray(props.params.creator)}
          title='Creator' />
        <Facet
          handleChange={props.handleChange}
          items={props.data.subject}
          paramKey='subject'
          params={toArray(props.params.subject)}
          title='Subject' />
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
  resultsCount: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired
}
