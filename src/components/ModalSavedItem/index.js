import React from 'react';
import PropTypes from "prop-types";
import { CheckBoxInput } from "../Inputs";
import { RestrictionsSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


const ModalSavedItem = props => (
  <li className="modal-saved-item">
    <CheckBoxInput
      className="checkbox--orange"
      id={props.uri}
      checked={props.isChecked || false}
      label={props.title}
      handleChange={props.handleChange} />
    {props.isRestrictionsLoading ?
      (<RestrictionsSkeleton />) :
      props.submit ? (null) : (<div className="modal-form__error">{props.submitReason}</div>)}
  </li>
)

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  isChecked: PropTypes.bool,
  isRestrictionsLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
}

const ModalSavedItemGroup = ({ handleChange, isRestrictionsLoading, items, title }) => {
  const listItems = items.map((item, index) =>
    <ModalSavedItem
      handleChange={handleChange}
      isRestrictionsLoading={isRestrictionsLoading}
      key={index}
      {...item} />
  );
  return (
    <div className="modal-saved-items__item-group">
      <h3 className="modal-item-group__title">{title}</h3>
      <ul className="modal-item-group__items">
        {listItems}
      </ul>
    </div>
  )
}

ModalSavedItemGroup.propTypes = {
  handleChange: PropTypes.func,
  isRestrictionsLoading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}


export const ModalSavedItemList = ({ handleChange, isRestrictionsLoading, items }) => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        isRestrictionsLoading={isRestrictionsLoading}
        handleChange={handleChange} />
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }
  return (
    <div className="modal-saved-items">
      {groupItems(items)}
    </div>
  )
}

ModalSavedItemList.propTypes = {
  handleChange: PropTypes.func,
  isRestrictionsLoading: PropTypes.bool,
  items: PropTypes.array.isRequired
}
