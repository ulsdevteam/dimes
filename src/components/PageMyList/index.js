import React, { Component } from 'react';
import Button from "../Button";
import Dropdown from "../Dropdown";
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
          iconBefore="delete" />
      </div>
    )
  }
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

class PageMyList extends Component {
  // TODO: remove mock data
  // TODO: make call to get data
  constructor(props) {
    super(props);
    this.items = [
      {
        "title": "Nelson A. Rockefeller gubernatorial records, Public Relations, Series 27",
        "items": [
          {
            "title": "'The Future of Federalism'",
            "date": "1962",
            "description": "NAR's Godkin Lectures at Harvard University in book format. (These annual lectures ...",
            "parent": "Subseries 1: Books and Articles",
            "lastRequested": "Apr 14 2020",
            "online": false
          },
          {
            "title": "'A Civil Rights Program for the United States'",
            "date": "June 17, 1960",
            "description": "Speech: Given at Buffalo, New York to National Sunday School and Baptist Training ...",
            "parent": "Subseries 2: Speeches",
            "lastRequested": "Apr 08 2020",
            "online": false
          }
        ]
      },
      {
        "title": "Rockefeller Foundation records, officers' diaries, RG 12, A-E",
        "items": [
          {
            "title": "1946-1947",
            "description": "RF_Aitken_1946_1947.pdf",
            "parent": "Officer: Aitken, Thomas H.G.",
            "online": true
          }
        ]
      }
    ]
  }
  render() {
    // TODO: add onClick handlers for actions
    return (
      <div className="container mylist flex">
        <main id="main" role="main">
          <div className="mylist__header">
            <h1 className="mylist__title">My List</h1>
            <Dropdown
              label="Actions"
              iconBefore="settings"
              className="mylist__actions"
              buttonClassName="btn--orange btn--md"
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
                    "onClick": null
                  }
                ]
              } />
          </div>
          <MyListExportActions />
          <SavedItemList items={this.items}/>
        </main>
        <MyListSidebar/>
      </div>
    );
  }
}

export default PageMyList;
