import React from 'react';
import PropTypes from "prop-types";
import Button from "../Button";
import { MyListSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


// TODO: styling for checkbox
const SavedItem = props => (
  <div className="saved-item">
    <div className="saved-item__item-description">
      <h3 className="saved-item__title">{props.title}</h3>
      {props.date !== props.title && <p className="saved-item__date">{props.date}</p>}
      {props.description && <p className="saved-item__description">{props.description}</p>}
      {props.parent && <p className="saved-item__found-in">Found in: <a href={props.parentRef}>{props.parent}</a></p>}
      {props.lastRequested && <p className="saved-item__last-requested">Last requested on: {props.lastRequested}</p>}
    </div>
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

const SavedItemGroup = ({ handleChange, items, toggleInList, title, uri }) => {
  const listItems = items.map((item, index) =>
    <SavedItem
      key={index}
      {...item}
      handleChange={handleChange}
      handleClick={() => toggleInList({...item, "group": {...item.group, identifier: uri}})} />
  )

  return (
    <div className="saved-items__item-group">
      <h2 className="item-group__title">{title}</h2>
      <div className="item-group__items">
        {listItems}
      </div>
    </div>
  )
}

SavedItemGroup.propTypes = {
  handleChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  toggleInList: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
}

export const SavedItemList = ({ handleChange, isLoading, items, toggleInList }) => {

  const groupItems = items => {
    return items.length ? (items.map((item) =>
      <SavedItemGroup
        key={item.title}
        {...item}
        handleChange={handleChange}
        toggleInList={toggleInList} />
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }

  return (
    <div className="saved-items">
      {isLoading ? <MyListSkeleton /> : groupItems(items)}
    </div>
  )
}

SavedItemList.propTypes = {
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  toggleInList: PropTypes.func.isRequired,
}
