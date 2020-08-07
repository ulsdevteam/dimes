import React, { Component } from 'react';
import Button from "../Button";
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";

class SavedItem extends Component {
  // TODO: add Digital Button
  // TODO: styling for checkbox
  render() {
    return (
      <div className="saved-item">
        <div className="saved-item__inputs">
          <CheckBoxInput
            className="checkbox--orange checkbox__hide-label"
            id={this.props.title}
            checked={true}
            label={this.props.title} />
        </div>
        <div className="saved-item__item-description">
          <h3 className="saved-item__title">{this.props.title}</h3>
          {this.props.date !== this.props.title && <p className="saved-item__date">{this.props.date}</p>}
          {this.props.description && <p className="saved-item__description">{this.props.description}</p>}
          {this.props.parent && <p className="saved-item__found-in">Found in: <a href={this.props.parentRef}>{this.props.parent}</a></p>}
          {this.props.lastRequested && <p className="saved-item__last-requested">Last requested on: {this.props.lastRequested}</p>}
          <div className="saved-item__buttons">
            {this.props.online &&
              <Button
                label="View Online"
                className="btn btn--blue btn--sm"
                iconAfter="visibility"/>}
            <Button
              label="Remove"
              className="btn btn--gray btn--sm"
              iconBefore="delete"/>
          </div>
        </div>
      </div>
    )
  }
}

class SavedItemGroup extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.listItems = items.map((item) =>
      <SavedItem
        key={item.uri}
        title={item.title}
        date={item.date}
        description={item.description}
        parent={item.parent}
        parentRef={item.parentRef}
        lastRequested={item.lastRequested}
        online={item.online} />
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

class SavedItemList extends Component {
  constructor(props) {
    super(props);
    const items = this.props.items
    this.groupItems = items ? (items.map((item) =>
      <SavedItemGroup
        key={item.title}
        title={item.title}
        items={item.items} />
    )) : (<p>No saved items.</p>)
  }
  render() {
    return (
      <div className="saved-items">
        {this.groupItems}
      </div>
    )
  }
}

export default SavedItemList;
