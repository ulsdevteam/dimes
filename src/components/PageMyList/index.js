import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Button from "../Button";
import {MyListDropdown} from "../Dropdown";
import {Helmet} from "react-helmet";
import {DuplicationRequestModal, EmailModal, ReadingRoomRequestModal} from "../Modal";
import {SavedItemList} from "../SavedItem";
import "./styles.scss";

const MyListExportActions = ({downloadCsv, emailList, removeAllItems}) => (
  <div className="mylist__export-actions show-on-lg-up">
    <Button
      className="btn--orange btn--sm"
      label="Email List"
      iconBefore="email"
      handleClick={emailList} />
    <Button
      className="btn--orange btn--sm"
      label="Download as .CSV"
      iconBefore="get_app"
      handleClick={downloadCsv} />
    <Button
      className="btn--gray btn--sm"
      label="Remove All Items"
      iconBefore="delete"
      handleClick={() => removeAllItems()} />
  </div>)

MyListExportActions.propTypes = {
  downloadCsv: PropTypes.func.isRequired,
  emailList: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired
}

const MyListSidebar = ({ duplicationRequest, readingRoomRequest, sendEmail }) => (
// TODO: add onClick actions
  <aside className="mylist__sidebar show-on-lg-up">
    <Button
      className="btn--orange btn--lg"
      label="Schedule a Visit"
      iconBefore="account_balance"
      handleClick={() => sendEmail()} />
    <Button
      className="btn--orange btn--lg"
      label="Request in Reading Room"
      iconBefore="local_library"
      handleClick={() => readingRoomRequest()} />
    <Button
      className="btn--orange btn--lg"
      label="Request Copies"
      iconBefore="content_copy"
      handleClick={() => duplicationRequest()} />
  </aside>)

MyListSidebar.propTypes = {
  duplicationRequest: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired
}

class PageMyList extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      "savedList": [],
      "modalList": [],
      "isLoading": true,
      "email": {
        "isOpen": false
      },
      "readingRoom": {
        "isOpen": false
      },
      "duplication": {
        "isOpen": false
      }
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    const list = await this.props.fetchMyList();
    const resolved = await this.resolveList(list);
    if (this._isMounted) {
      this.setState({savedList: resolved})
      this.setState({modalList: resolved})
      this.setState({isLoading: false})
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  downloadCsv = () => {
    // TODO: what should happen if there are errors?
    axios
      .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/download-csv/`, this.state.savedList)
      .then(res => { console.log(res.data) })
      .catch(err => { console.log(err) });
  }
  /**
  * Sets isChecked attribute based on checkbox input
  * Updates modalList by filtering out any list items that are not checked
  */
  handleSavedListChange = (e) => {
    var updatedSavedList = []
    for (const g of this.state.savedList) {
      if (g.items.filter(i => {return i.uri === e.target.id}).length) {
        var newGroup = {...g}
        newGroup.items.filter(i => {return i.uri === e.target.id})[0].isChecked = e.target.checked
        updatedSavedList.push(newGroup);
      } else {
        updatedSavedList.push(g);
      }
    }
    this.setState({savedList: updatedSavedList})

    var filtered = [...this.state.savedList]
    for (var group of filtered) {
      group.items = group.items.filter(i => {return i.isChecked === true})
    }
    this.setState({modalList: filtered})
  }
  handleFormSubmit = (uri, submitted, modal) => {
    // TODO: remove toggleModal, which is just here for testing purposes.
    this.toggleModal(modal);
    axios
      .post(uri, submitted)
      .then(res => { this.toggleModal(modal); })
      .catch(err => { console.log(err) }
    );
  }
  fetchFromUri(uri) {
    return axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}${uri}`)
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
  /** Fetches data about list items from canonical source */
  resolveList = async(list) => {
    var resolvedList = [];
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
              "saved": value.saved,
              "isChecked": true,
              "archivesspace_uri": fetchedItem.external_identifiers.filter(i => {return i.source === "archivesspace"})[0].identifier
            })
          }
        }
        resolvedList.push(resolved)
      }
    }
    return resolvedList;
  }
  sendEmail = () => {
    window.open("mailto:archive@rockarch.org?subject=Scheduling a research appointment");
  }
  toggleModal = (modal)  => {
    this.setState({ [modal]: {...this.state[modal], isOpen: !this.state[modal]["isOpen"], error: ""} })
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
              <MyListDropdown
                duplicationRequest={() => this.toggleModal("duplication")}
                emailList={() => this.toggleModal("email")}
                readingRoomRequest={() => this.toggleModal("readingRoom")}
                removeAllItems={this.removeAllItems}
                sendEmail={this.sendEmail} />
            </div>
            <MyListExportActions
                downloadCsv={this.downloadCsv}
                emailList={() => this.toggleModal("email")}
                removeAllItems={this.removeAllItems} />
            <SavedItemList
              items={this.state.savedList}
              isLoading={this.state.isLoading}
              handleChange={this.handleSavedListChange}
              removeItem={this.removeItem} />
          </main>
          <MyListSidebar
              duplicationRequest={() => this.toggleModal("duplication")}
              readingRoomRequest={() => this.toggleModal("readingRoom")}
              sendEmail={this.sendEmail} />
        </div>
        <EmailModal
          {...this.state.email}
          toggleModal={() => this.toggleModal("email")}
          handleFormSubmit={this.handleFormSubmit}
          list={this.state.modalList}
        />
        <ReadingRoomRequestModal
          {...this.state.readingRoom}
          toggleModal={() => this.toggleModal("readingRoom")}
          handleFormSubmit={this.handleFormSubmit}
          list={this.state.modalList}
        />
        <DuplicationRequestModal
          {...this.state.duplication}
          toggleModal={() => this.toggleModal("duplication")}
          handleFormSubmit={this.handleFormSubmit}
          list={this.state.modalList}
        />
      </React.Fragment>
    );
  }
}

PageMyList.propTypes = {
  fetchMyList: PropTypes.func.isRequired
}

export default PageMyList;
