import React from 'react';
import PropTypes from "prop-types";
import Button from "../Button";
import { CheckBoxInput } from "../Inputs";
import { MyListSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


// TODO: styling for checkbox
const SavedItem = props => (
  <div className="saved-item">
    <div className="saved-item__inputs">
      <CheckBoxInput
        className="checkbox--orange hide-label"
        id={props.uri}
        checked={props.isChecked}
        label={props.title}
        handleChange={e => props.handleChange(e)} />
    </div>
    <div className="saved-item__item-description">
      <h3 className="saved-item__title">{props.title}</h3>
      {props.date !== props.title && <p className="saved-item__date">{props.date}</p>}
      {props.description && <p className="saved-item__description">{props.description}</p>}
      {props.parent && <p className="saved-item__found-in">Found in: <a href={props.parentRef}>{props.parent}</a></p>}
      {props.lastRequested && <p className="saved-item__last-requested">Last requested on: {props.lastRequested}</p>}
      <div className="saved-item__buttons">
        {props.online &&
          <Button
            label="View Online"
            className="btn btn--blue btn--sm"
            iconAfter="visibility" />}
        <Button
          label="Remove"
          className="btn btn--gray btn--sm"
          iconBefore="delete"
          handleClick={props.handleClick} />
      </div>
    </div>
  </div>)

SavedItem.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  handleClick: PropTypes.func,
  isChecked: PropTypes.bool,
  lastRequested: PropTypes.instanceOf(Date),
  online: PropTypes.bool,
  parent: PropTypes.string,
  parentRef: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string
}

const ModalSavedItem = ({ handleChange, title, uri }) => (
  // TODO: styling for checkbox
  <li className="modal-saved-item">
    <CheckBoxInput
      className="checkbox--orange"
      id={uri}
      checked={true}
      label={title}
      handleChange={handleChange} />
  </li>
)

ModalSavedItem.propTypes = {
  handleChange: PropTypes.func,
  title: PropTypes.string.isRequired
}

const SavedItemGroup = props => {
  const listItems = props.items.map((item, index) =>
    <SavedItem
      key={index}
      {...item}
      handleChange={props.handleChange}
      handleClick={() => props.removeItem(item.uri, props.groupUri)} />
  );
  return (
    <div className="saved-items__item-group">
      <h2 className="item-group__title">{props.title}</h2>
      <div className="item-group__items">
        {listItems}
      </div>
    </div>
  )
}

SavedItemGroup.propTypes = {
  groupUri: PropTypes.string,
  handleChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func,
  title: PropTypes.string.isRequired
}

const ModalSavedItemGroup = props => {
  const listItems = props.items.map((item, index) =>
    <ModalSavedItem
      handleChange={props.handleChange}
      key={index}
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
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export const SavedItemList = props => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <SavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        removeItem={props.removeItem}
        handleChange={props.handleChange} />
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }
  return (
    <div className="saved-items">
      {props.isLoading ? <MyListSkeleton /> : groupItems(props.items)}
    </div>
  )
}

SavedItemList.propTypes = {
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func
}

export const ModalSavedItemList = props => {
  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        handleChange={props.handleChange} />
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
  items: PropTypes.array.isRequired
}
