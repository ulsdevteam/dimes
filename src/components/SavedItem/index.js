import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from "../Button";
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";

const SavedItem = (props) => (
// TODO: styling for checkbox
// TODO: onClick handlers for buttons
  <div className="saved-item">
    <div className="saved-item__inputs">
      <CheckBoxInput
        className="checkbox--orange hide-label"
        id={props.uri}
        checked={props.inRequest}
        label={props.title}
        handleChange={props.toggleInRequest} />
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
          handlerClick={props.handleClick} />
      </div>
    </div>
  </div>)

SavedItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  parent: PropTypes.string,
  parentRef: PropTypes.string,
  lastRequested: PropTypes.instanceOf(Date),
  online: PropTypes.bool
}

const ModalSavedItem = ({ title, uri }) => (
  // TODO: styling for checkbox
  <li className="modal-saved-item">
    <CheckBoxInput
      className="checkbox--orange"
      id={uri}
      checked={true}
      label={title} />
  </li>
)

ModalSavedItem.propTypes = {
  title: PropTypes.string.isRequired
}

class SavedItemGroup extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.listItems = items.map((item, index) =>
      <SavedItem
        key={index}
        {...item}
        handleClick={() => this.props.removeItem(this.props.groupUri, item.uri)}
        toggleInRequest={() => this.props.toggleInRequest(this.props.groupUri, item.uri)} />
    );
  }
  render() {
    return (
      <div className="saved-items__item-group">
        <h2 className="item-group__title">{this.props.title}</h2>
        <div className="item-group__items">
          {this.listItems}
        </div>
      </div>
    )
  }
}

SavedItemGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

class ModalSavedItemGroup extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.listItems = items.map((item, index) =>
      <ModalSavedItem
        key={index}
        {...item} />
    );
  }
  render() {
    return (
      <div className="modal-saved-items__item-group">
        <h3 className="modal-item-group__title">{this.props.title}</h3>
        <ul className="modal-item-group__items">
          {this.listItems}
        </ul>
      </div>
    )
  }
}

ModalSavedItemGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

export class SavedItemList extends Component {
  groupItems = items => {
    return items.length ? (items.map((item) =>
      <SavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri}
        removeItem={this.props.removeItem}
        toggleInRequest={this.props.toggleInRequest} />
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }
  render() {
    return (
      <div className="saved-items">
        {this.props.isLoading ? <p className="saved-items__loading">Loading...</p> : this.groupItems(this.props.items)}
      </div>
    )
  }
}

SavedItemList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
}

export class ModalSavedItemList extends Component {
  groupItems = items => {
    return items.length ? (items.map((item) =>
      <ModalSavedItemGroup
        key={item.title}
        {...item}
        groupUri={item.uri} />
    )) : (<p className="saved-items__empty">No saved items.</p>)
  }
  render() {
    return (
      <div className="modal-saved-items">
        {this.groupItems(this.props.items)}
      </div>
    )
  }
}

ModalSavedItemList.propTypes = {
  items: PropTypes.array.isRequired
}
