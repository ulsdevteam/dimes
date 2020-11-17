import React, {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { CheckBoxInput } from "../Inputs";
import { RestrictionsSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


const ModalSavedItemsRestrictions = ({archivesspace_uri, setSubmit, uri}) => {
  const [isRestrictionsLoading, setIsRestrictionsLoading] = useState(true)
  const [submitReason, setSubmitReason] = useState("")

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/process-request/parse`, {items: [archivesspace_uri]})
      .then(res => {
        setSubmit(uri, res.data.items[0].submit)
        setSubmitReason(res.data.items[0].submit_reason)
      })
      .catch(err => console.log(err))
      .then(() => setIsRestrictionsLoading(false));
  }, [archivesspace_uri, setSubmit, uri])

  return (
    isRestrictionsLoading ?
      (<RestrictionsSkeleton />) :
      (submitReason ? (<div className="modal-form__error">{submitReason}</div>) : (null))
  )
}


const ModalSavedItem = props => (
  <li className="modal-saved-item">
    <CheckBoxInput
      className="checkbox--orange"
      id={props.uri}
      checked={props.isChecked || false}
      label={props.title}
      handleChange={props.handleChange}
      disabled={!props.ignoreRestrictions && !props.submit} />
    {props.ignoreRestrictions ?
      (null) :
      (<ModalSavedItemsRestrictions
          archivesspace_uri={props.archivesspace_uri}
          setSubmit={props.setSubmit}
          uri={props.uri} />)
    }
  </li>
)

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  isChecked: PropTypes.bool,
  setSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
}

const ModalSavedItemGroup = props => {
  const listItems = props.items.map((item, index) =>
    <ModalSavedItem
      handleChange={props.handleChange}
      ignoreRestrictions={props.ignoreRestrictions}
      key={index}
      setSubmit={props.setSubmit}
      {...item} />
  );
  return (
    <div className="modal-saved-items__item-group">
      <h3 className="modal-item-group__title">{props.title}</h3>
      <ul className="modal-item-group__items">
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
  title: PropTypes.string.isRequired,
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
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }
  return (
    <div className="modal-saved-items">
      {groupItems(props.items)}
    </div>
  )
}

ModalSavedItemList.propTypes = {
  handleChange: PropTypes.func,
  ignoreRestrictions: PropTypes.bool,
  items: PropTypes.array.isRequired,
  setSubmit: PropTypes.func.isRequired,
}
