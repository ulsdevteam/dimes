import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { CheckBoxInput } from '../Inputs'
import { RestrictionsSkeleton } from '../LoadingSkeleton'
import './styles.scss'

const ModalSavedItemsRestrictions = ({isRestrictionsLoading, submitReason}) => (
  isRestrictionsLoading ?
    (<RestrictionsSkeleton />) :
    (submitReason ? (<div className='modal-form__error'>{submitReason}</div>) : (null))
)

const ModalSavedItem = props => {
  const [isRestrictionsLoading, setIsRestrictionsLoading] = useState(false)
  const { archivesspace_uri, ignoreRestrictions, handleChange, isChecked, setSubmit, submitReason, title, submit, uri} = props

  /** Fetches submittable information and sets returned object to state */
  useEffect(() => {
    if (!props.ignoreRestrictions && typeof props.submit === 'undefined') {
      setIsRestrictionsLoading(true)
      axios
        .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/process-request/parse`, {item: archivesspace_uri})
        .then(res => {
          setSubmit(uri, res.data.submit, res.data.submit_reason)
        })
        .catch(err => console.log(err))
        .then(() => setIsRestrictionsLoading(false))
    }
  }, [ignoreRestrictions, submit, archivesspace_uri, uri, setSubmit])

  return (
    <li className='modal-saved-item'>
      <CheckBoxInput
        className='checkbox--orange'
        id={uri}
        checked={isChecked || false}
        label={title}
        handleChange={handleChange}
        disabled={!ignoreRestrictions && !submit} />
      {ignoreRestrictions ?
        (null) :
        (<ModalSavedItemsRestrictions
          isRestrictionsLoading={isRestrictionsLoading}
          setSubmit={setSubmit}
          submitReason={submitReason} />)
      }
    </li>
  )
}

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  isChecked: PropTypes.bool,
  setSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired
}

const ModalSavedItemGroup = props => {
  const listItems = props.items.map((item, index) =>
    <ModalSavedItem
      handleChange={props.handleChange}
      ignoreRestrictions={props.ignoreRestrictions}
      key={index}
      setSubmit={props.setSubmit}
      {...item} />
  )
  return (
    <div className='modal-saved-items__item-group'>
      <h3 className='modal-item-group__title'>{props.title}</h3>
      <ul className='modal-item-group__items'>
        {listItems}
      </ul>
    </div>
  )
}

ModalSavedItemGroup.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  items: PropTypes.array.isRequired,
  setSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export const ModalSavedItemList = props => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        ignoreRestrictions={props.ignoreRestrictions}
        handleChange={props.handleChange}
        setSubmit={props.setSubmit} />
    )) : (<p className='saved-items__empty'>No saved items.</p>)
  }
  return (
    <div className='modal-saved-items'>
      {groupItems(props.items)}
    </div>
  )
}

ModalSavedItemList.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  items: PropTypes.array.isRequired,
  setSubmit: PropTypes.func.isRequired
}
