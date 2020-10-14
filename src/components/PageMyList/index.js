  import React, { Component } from 'react';
  import PropTypes from "prop-types";
  import axios from "axios";
  import { Helmet } from "react-helmet";
  import Button from "../Button";
  import { MyListDropdown } from "../Dropdown";
  import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from "../ModalMyList";
  import ModalConfirm from "../ModalConfirm";
  import { SavedItemList } from "../SavedItem";
  import "./styles.scss";

  const MyListExportActions = ({ confirmDeleteAll, downloadCsv, emailList }) => (
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
        handleClick={() => confirmDeleteAll()} />
    </div>)

  MyListExportActions.propTypes = {
    confirmDeleteAll: PropTypes.func.isRequired,
    downloadCsv: PropTypes.func.isRequired,
    emailList: PropTypes.func.isRequired,
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
        savedList: [],
        modalList: [],
        submitList: [],
        isLoading: true,
        email: {isOpen: false},
        readingRoom: {isOpen: false},
        duplication: {isOpen: false},
        confirm: {
          isOpen: false,
          title: "",
          message: ""
        },
        confirmDeleteAll: {isOpen: false}
      };
    }

    async componentDidUpdate(nextProps, nextState) {
      if (nextProps.savedList !== this.props.savedList) {
        this.setState({isLoading: true})
        const resolved = await this.resolveList(this.props.savedList)
        const submitList = this.constructSubmitList(resolved);
        this.setState({savedList: resolved, modalList: resolved, submitList: submitList})
        this.setState({isLoading: false})
      }
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

    handleConfirmData = (title, message) => {
      this.setState({ confirm: { ...this.state.confirm, title: title, message: message } })
    }

    handleFormSubmit = (uri, submitted, modal) => {
      // TODO: remove toggleModal, which is just here for testing purposes.
      this.toggleModal(modal);
      axios
        .post(uri, submitted)
        .then(res => {
          this.toggleModal(modal);
          const title = modal === "email" ? "Email Sent" : "Requests Delivered"
          var message = ""
          if (modal === "email") {
            message = `Selected items in your list have been emailed to ${submitted.email}`
          } else if (modal === "duplication") {
            message = ["Your requests have been submitted to",
                       <a href='https://raccess.rockarch.org'>RACcess</a>, ". ",
                       "You can track their status using your RACcess account."]
          } else {
            message = ["Your requests have been submitted to ",
                       <a href='https://raccess.rockarch.org'>RACcess</a>, ". ",
                       "You can track their status using your RACcess account.",
                       <br/ >, <br />,
                       "Requests to access archival records in the Reading Room are processed between 10am-3pm on days when the Rockefeller Archive Center is open."]
          }
          this.handleConfirmData(title, message);
        })
        .catch(err => {
          console.log(err)
          /** the following lines commented out for testing purposes only */
          // const title = "Error submitting request"
          // const message = `There was an error submitting your request. The error message was: ${err.toString()}`
          // this.handleConfirmData(title, message);
          /** end commented code */
        })
        .then(() => {
          /** added for testing purposes ONLY, should be removed once Request Broker is in place */
          const title = modal === "email" ? "Email Sent" : "Requests Delivered"
          var message = ""
          if (modal === "email") {
            message = `Selected items in your list have been emailed to ${submitted.email}`
          } else if (modal === "duplication") {
            message = ["Your requests have been submitted to ",
                       <a href='https://raccess.rockarch.org'>RACcess</a>, ". ",
                       "You can track their status using your RACcess account."]
          } else {
            message = ["Your requests have been submitted to ",
                       <a href='https://raccess.rockarch.org'>RACcess</a>, ". ",
                       "You can track their status using your RACcess account.",
                       <br/ >, <br />,
                       "Requests to access archival records in the Reading Room are processed between 10am-3pm on days when the Rockefeller Archive Center is open."]
          }
          this.handleConfirmData(title, message);
          /** end testing code */
          this.toggleModal("confirm")
        });

    }

    fetchFromUri = uri => {
      return axios
        .get(`${process.env.REACT_APP_ARGO_BASEURL}${uri}`)
        .then(res => res.data)
        .catch(err => console.log(err));
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
    resolveList = async (list) => {
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
            const fetchedAncestors = await this.fetchFromUri(`${key}/ancestors/`)
            if (fetchedItem) {
              let note = fetchedItem.notes && fetchedItem.notes.filter(n => {return n.title === "Scope and Contents"})[0];
              const description = note && note.subnotes ? note.subnotes.map(s => s.content).join("\r\n") : null
              resolved.items.push({
                "title": fetchedItem.title,
                "uri": fetchedItem.uri,
                "date": fetchedItem.dates && fetchedItem.dates.map(d => d.expression).join(", "),
                "description": description,
                "parent": fetchedAncestors.title,
                "parentRef": fetchedAncestors.uri,
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
      return resolvedList
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

    /** Checks or unchecks all items in list, depending on value passed to function
    * value: boolean
    */
    toggleList = value => {
      const updatedList = this.state.modalList.map(g => {
        const updatedGroupItems = g.items.map(i => ({...i, isChecked: value}))
        return {...g, items: updatedGroupItems}
      })
      this.setState({ modalList: updatedList })
    }

    toggleModal = async (modal)  => {
      this.setState({ [modal]: {...this.state[modal], isOpen: !this.state[modal]["isOpen"], error: ""} })
      const resolved = await this.resolveList(this.props.savedList)
      const submitList = this.constructSubmitList(resolved);
      this.setState({submitList: submitList})
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
                  removeAllItems={this.props.removeAllItems}
                  sendEmail={this.sendEmail} />
              </div>
              <MyListExportActions
                  confirmDeleteAll={() => this.toggleModal("confirmDeleteAll")}
                  downloadCsv={this.downloadCsv}
                  emailList={() => this.toggleModal("email")} />
              <SavedItemList
                items={this.state.savedList}
                isLoading={this.state.isLoading}
                toggleInList={this.props.toggleInList} />
            </main>
            <MyListSidebar
                duplicationRequest={() => this.toggleModal("duplication")}
                readingRoomRequest={() => this.toggleModal("readingRoom")}
                sendEmail={this.sendEmail} />
          </div>
          <EmailModal
            {...this.state.email}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("email")}
          />
          <ReadingRoomRequestModal
            {...this.state.readingRoom}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("readingRoom")}
          />
          <DuplicationRequestModal
            {...this.state.duplication}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            list={this.state.modalList}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("duplication")}
          />
          <ModalConfirm
            {...this.state.confirm}
            toggleModal={() => this.toggleModal("confirm")}
          />
          <ModalConfirm
            {...this.state.confirmDeleteAll}
            message={
              <>Are you sure you want to remove all the items from your list?
              <div className="confirm-buttons">
                <Button className="btn--sm btn--orange" label="Remove" handleClick={() => {this.props.removeAllItems(); this.toggleModal("confirmDeleteAll");}} />
                <Button className="btn--sm btn--gray" label="Cancel" handleClick={() => this.toggleModal("confirmDeleteAll")}/>
              </div>
              </>
            }
            title="Confirm delete all"
            toggleModal={() => this.toggleModal("confirmDeleteAll")}
          />
        </React.Fragment>
      );
    }
  }

  PageMyList.propTypes = {
    removeAllItems: PropTypes.func.isRequired,
    savedList: PropTypes.object.isRequired,
    toggleInList: PropTypes.func.isRequired,
  }

  export default PageMyList;
