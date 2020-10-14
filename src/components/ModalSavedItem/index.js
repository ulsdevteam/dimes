import React from 'react';
import PropTypes from "prop-types";
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";


const ModalSavedItem = ({ handleChange, isChecked, title, uri }) => (
  // TODO: styling for checkbox
  <li className="modal-saved-item">
    <CheckBoxInput
      className="checkbox--orange"
      id={uri}
      checked={isChecked}
      label={title}
      handleChange={handleChange} />
  </li>
)

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  title: PropTypes.string.isRequired
}

const ModalSavedItemGroup = ({ handleChange, items, title }) => {
  const listItems = items.map((item, index) =>
    <ModalSavedItem
      handleChange={handleChange}
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
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}


export const ModalSavedItemList = ({ handleChange, items }) => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
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
  items: PropTypes.array.isRequired
}
