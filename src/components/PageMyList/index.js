import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Button from "../Button";
import Dropdown from "../Dropdown";
import {Helmet} from "react-helmet";
import SavedItemList from "../SavedItem";
import "./styles.scss";

class MyListExportActions extends Component {
  // TODO: add onClick actions
  render() {
    return (
      <div className="mylist__export-actions">
        <Button
          className="btn--orange btn--sm"
          label="Email List"
          iconBefore="email" />
        <Button
          className="btn--orange btn--sm"
          label="Download as .CSV"
          iconBefore="get_app" />
        <Button
          className="btn--gray btn--sm"
          label="Remove All Items"
          iconBefore="delete"
          onClick={() => this.props.removeAllItems()} />
      </div>
    )
  }
}

MyListExportActions.propTypes = {
  removeAllItems: PropTypes.func.isRequired
}

class MyListSidebar extends Component  {
  // TODO: add onClick actions
  render() {
    return (
      <aside className="mylist__sidebar">
        <Button
          className="btn--orange btn--lg"
          label="Schedule a Visit"
          iconBefore="account_balance" />
        <Button
          className="btn--orange btn--lg"
          label="Request in Reading Room"
          iconBefore="local_library" />
        <Button
          className="btn--orange btn--lg"
          label="Request Copies"
          iconBefore="content_copy" />
      </aside>
    )
  }
}

MyListSidebar.propTypes = {

}

class PageMyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "savedItems": [],
      "isLoading": true
    }
  }
  componentDidMount() {
    // TODO: resolve error with state update on unmounted component
    const list = this.props.fetchMyList();
    this.resolveList(list);
  }
  resolveList = async(list) => {
    for (const [uri, items] of Object.entries(list)) {
      const fetchedGroup = await this.fetchFromUri(uri);
      if (fetchedGroup) {
        const resolved = {
          "title": fetchedGroup.title,
          "uri": fetchedGroup.uri,
          "items": []
        }
        for (const [key, value] of Object.entries(items)) {
          const fetchedItem = await this.fetchFromUri(key)
          if (fetchedItem) {
            let dates = []
            fetchedItem["dates"].forEach(function(e) {
                dates = dates.concat(e.expression);
            });
            let description = []
            if (fetchedItem.notes) {
              fetchedItem.notes.forEach(function(e) {
                if (e.title === "Scope and Contents") {
                  e.subnotes.forEach(function(s) {
                    description = description.concat(s.content)
                  })
                }
              });
            }
            resolved.items.push({
              "title": fetchedItem.title,
              "uri": fetchedItem.uri,
              "date": dates.join(", "),
              "description": description.join(", "),
              "parent": fetchedItem.ancestors[0].title,
              "parentRef": `/collections/${fetchedItem.ancestors[0].identifier}`,
              "online": fetchedItem.online,
              "lastRequested": value.lastRequested ? value.lastRequested : null,
              "saved": value.saved
            })
          }
        }
        this.setState({ savedItems: [...this.state.savedItems, resolved] })
      }
    }
    this.setState({isLoading: false})
  }
  fetchFromUri(uri) {
    return axios
      .get(`http://localhost:8000${uri}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  removeAllItems = () => {
    this.props.saveMyList({})
  }
  removeItem = (group, item) => {
    // TODO: Reload list in more performant way
    const list = this.props.fetchMyList();
    delete list[group][item]
    if (Object.entries(list[group]).length === 0) {
      delete list[group]
    }
    this.props.saveMyList(list);
    this.resolveList(list);
  }
  render() {
    // TODO: add onClick handlers for actions
    return (
      <React.Fragment>
        <Helmet>
          <title>DIMES: My List</title>
        </Helmet>
        <div className="container mylist flex">
          <main id="main" role="main">
            <div className="mylist__header">
              <h1 className="mylist__title">My List</h1>
              <Dropdown
                label="Actions"
                iconBefore="settings"
                className="mylist__actions"
                buttonClassName="btn btn--orange btn--md"
                itemClassName="dropdown__item--orange"
                listClassName="dropdown__list--orange"
                items={
                  [
                    {
                      "label": "Schedule a Visit",
                      "iconBefore": "account_balance",
                      "onClick": null
                    },
                    {
                      "label": "Request in Reading Room",
                      "iconBefore": "local_library",
                      "onClick": null
                    },
                    {
                      "label": "Request Copies",
                      "iconBefore": "content_copy",
                      "onClick": null
                    },
                    {
                      "label": "Email List",
                      "iconBefore": "email",
                      "onClick": null
                    },
                    {
                      "label": "Download as .csv",
                      "iconBefore": "get_app",
                      "onClick": null
                    },
                    {
                      "label": "Remove All Items",
                      "iconBefore": "delete",
                      "onClick": this.removeAllItems
                    }
                  ]
                } />
            </div>
            <MyListExportActions removeAllItems={this.removeAllItems} />
            <SavedItemList
              items={this.state.savedItems}
              isLoading={this.state.isLoading}
              removeItem={this.removeItem} />
          </main>
          <MyListSidebar/>
        </div>
      </React.Fragment>
    );
  }
}

PageMyList.propTypes = {
  fetchMyList: PropTypes.func.isRequired
}

export default PageMyList;
