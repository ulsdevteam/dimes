  import React, { Component } from 'react';
  import PropTypes from "prop-types";
  import axios from "axios";
  import { Helmet } from "react-helmet";
  import Button from "../Button";
  import { MyListDropdown } from "../Dropdown";
  import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from "../Modal";
  import { SavedItemList } from "../SavedItem";
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
        "submitList": [],
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
      const list = this.props.fetchMyList();
      const resolved = await this.resolveList(list);
      const submitList = this.constructSubmitList(resolved);
      if (this._isMounted) {
        this.setState({savedList: resolved, modalList: resolved, submitList: submitList})
        this.setState({isLoading: false})
      }
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    /** Returns a list of ArchivesSpace URIs for checked items in list */
    constructSubmitList = (list) => {
      var submitList = [];
      for (const group of list) {
        for (const item of group.items) {
          item.isChecked && submitList.push(item.archivesspace_uri)
        }
      }
      return submitList
    }
    downloadCsv = () => {
      // TODO: what should happen if there are errors?
      axios
        .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/download-csv/`, this.state.savedList)
        .then(res => { console.log(res.data) })
        .catch(err => { console.log(err) });
    }
    /**
    * Sets isChecked attribute on modalList based on checkbox input.
    * Updates submitList by filtering unchecked items.
    */
    handleModalListChange = (e) => {
      const updatedModalList = this.setIsChecked(e, this.state.modalList)
      this.setState({modalList: updatedModalList})

      const submitList = this.constructSubmitList(updatedModalList)
      this.setState({submitList: submitList})
    }
    /**
    * Sets isChecked attribute on savedList based on checkbox input.
    * Updates modalList by filtering out unchecked items.
    */
    handleSavedListChange = (e) => {
      const updatedSavedList = this.setIsChecked(e, this.state.savedList)
      this.setState({savedList: updatedSavedList})

      const filtered = this.removeUnchecked(this.state.savedList)
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
    fetchFromUri = uri => {
      return axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}${uri}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    }
    removeAllItems = () => {
      this.props.saveMyList({})
    }
    removeItem = (groupUri, itemUri) => {
      // TODO: find a way to call this without triggering a component refresh
      // This happens because we set myListCount at the app level
      const list = this.props.fetchMyList();
      delete list[groupUri][itemUri]
      if (Object.entries(list[groupUri]).length === 0) {
        delete list[groupUri]
      }
      this.props.saveMyList(list);
    }
    /** Returns a list with all unchecked items removed */
    removeUnchecked = (list) => {
      var filteredList = [];
      for (const group of list) {
        var newGroup = {...group}
        newGroup.items = group.items.filter(i => {return i.isChecked})
        filteredList.push(newGroup);
      }
      return filteredList;
    }
    /** Returns data about list items fetched from canonical source */
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
              let description = fetchedItem.notes && fetchedItem.notes.forEach(function(e) {
                if (e.title === "Scope and Contents") {
                  e.subnotes.forEach(function(s) {
                    description = description.concat(s.content)
                  });
                }
              });
              resolved.items.push({
                "title": fetchedItem.title,
                "uri": fetchedItem.uri,
                "date": fetchedItem.dates && fetchedItem.dates.map(d => d.expression).join(", "),
                "description": description && description.join(", "),
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
    /** Returns list with isChecked attributes set based on checkbox input. */
    setIsChecked = (e, list) => {
      var updatedList = []
      for (const group of list) {
        if (group.items.filter(i => {return i.uri === e.target.id}).length) {
          var newGroup = {...group}
          newGroup.items.filter(i => {return i.uri === e.target.id})[0].isChecked = e.target.checked
          updatedList.push(newGroup);
        } else {
          updatedList.push(group);
        }
      }
      return updatedList
    }
    toggleModal = (modal)  => {
      this.setState({ [modal]: {...this.state[modal], isOpen: !this.state[modal]["isOpen"], error: ""} })
    }
    render() {
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
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
          />
          <ReadingRoomRequestModal
            {...this.state.readingRoom}
            toggleModal={() => this.toggleModal("readingRoom")}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
          />
          <DuplicationRequestModal
            {...this.state.duplication}
            toggleModal={() => this.toggleModal("duplication")}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
          />
        </React.Fragment>
      );
    }
  }

  PageMyList.propTypes = {
    fetchMyList: PropTypes.func.isRequired
  }

  export default PageMyList;
