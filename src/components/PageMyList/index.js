  import React, { Component } from 'react';
  import PropTypes from "prop-types";
  import axios from "axios";
  import { Helmet } from "react-helmet";
  import Button from "../Button";
  import { MyListDropdown } from "../Dropdown";
  import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from "../ModalMyList";
  import MaterialIcon from "../MaterialIcon";
  import ModalConfirm from "../ModalConfirm";
  import MyListExportActions from "../MyListExportActions";
  import MyListSidebar from "../MyListSidebar";
  import { SavedItemList } from "../SavedItem";
  import { fetchMyList } from "../MyListHelpers";
  import "./styles.scss";

  class PageMyList extends Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        savedList: [],
        submitList: [],
        isDownloading: false,
        isLoading: true,
        isRestrictionsLoading: true,
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

    componentDidMount() {
      this.fetchList()
    }

    /** Returns a list of ArchivesSpace URIs for checked items in list */
    constructSubmitList = (list, allItems) => {
      var submitList = [];
      for (const group of list) {
        for (const item of group.items) {
          if (allItems) {
            submitList.push(item.archivesspace_uri)
          } else {
            item.isChecked && submitList.push(item.archivesspace_uri)
          }
        }
      }
      return submitList
    }

    /* Requests CSV data and downloads a local file */
    downloadCsv = () => {
      this.setState({ isDownloading: true })
      axios
        .post(
          `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/download-csv/`,
          {items: this.constructSubmitList(this.state.savedList, true)})
        .then(res => {
          const blob = new Blob([res.data], { type: "text/csv" })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `dimes-${new Date().toISOString()}.csv`
          link.click()
        })
        .catch(err => { console.log(err) })
        .then(() => this.setState({ isDownloading: false }));
    }

    /**
    * Sets isChecked attribute on savedList based on checkbox input.
    * Updates submitList by filtering unchecked items.
    */
    handleModalListChange = (e) => {
      const updatedList = this.setIsChecked(e, this.state.savedList)
      this.setState({savedList: updatedList})
      this.setState({submitList: this.constructSubmitList(updatedList)})
    }

    /** Sets messages in confirm modal */
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
            message = <p>{`Selected items in your list have been emailed to ${submitted.email}`}</p>
          } else if (modal === "duplication") {
            message = <p>Your requests have been submitted to <a href="https://raccess.rockarch.org">RACcess</a>. You can track their status using your RACcess account.</p>
          } else {
            message = <p>Your requests have been submitted to <a href="https://raccess.rockarch.org">RACcess</a>. You can track their status using your RACcess account.<br/ > <br />Requests to access archival records in the Reading Room are processed between 10am-3pm on days when the Rockefeller Archive Center is open.</p>
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
            message = <p>{`Selected items in your list have been emailed to ${submitted.email}`}</p>
          } else if (modal === "duplication") {
            message = <p>Your requests have been submitted to <a href="https://raccess.rockarch.org">RACcess</a>. You can track their status using your RACcess account.</p>
          } else {
            message = <p>Your requests have been submitted to <a href="https://raccess.rockarch.org">RACcess</a>. You can track their status using your RACcess account.<br/ ><br />Requests to access archival records in the Reading Room are processed between 10am-3pm on days when the Rockefeller Archive Center is open.</p>
          }
          this.handleConfirmData(title, message);
          /** end testing code */
          this.toggleModal("confirm")
        });
    }

    combineParsedData = (list, parsed) => {
      const uriList = this.constructSubmitList(list, true)
      axios
        .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/api/process-request/parse`, {items: uriList})
        .then(res => {
          var combinedList = [];
          for (const group of list) {
            var newGroup = {...group}
            group.items.map(item => {
              var parsedItem = res.data.items.find(i => i.uri === item.archivesspace_uri)
              item.submit = parsedItem.submit
              item.submitReason = parsedItem.submit_reason
              return item
            })
            combinedList.push(newGroup);
          }
        })
        .catch(err => console.log(err))
        .then(() => this.setState({ isRestrictionsLoading: false }));
    }

    fetchList = () => {
      const list = fetchMyList();
      axios
        .post(`${process.env.REACT_APP_ARGO_BASEURL}/mylist`, {list: list})
        .then(res => {
          this.setState({ savedList: res.data, submitList: this.constructSubmitList(res.data) })
          this.combineParsedData(res.data)
        })
        .catch(err => console.log(err))
        .then(() => this.state.isLoading && this.setState({isLoading: false}));
    }

    removeAllFromList = () => {
      this.props.removeAllListItems();
      this.fetchList();
    }

    removeFromList = item => {
      this.props.toggleInList(item);
      var filteredList = [];
      for (const group of this.state.savedList) {
        var newGroup = {...group}
        newGroup.items = group.items.filter(i => i.uri !== item.uri)
        newGroup.items.length && filteredList.push(newGroup);
      }
      this.setState({ savedList: filteredList, submitList: this.constructSubmitList(filteredList) })
    }

    /** Returns a list with all unchecked items removed */
    removeUnchecked = (list) => {
      var filteredList = [];
      for (const group of list) {
        var newGroup = {...group}
        newGroup.items = group.items.filter(i => {return i.isChecked})
        newGroup.items.length && filteredList.push(newGroup);
      }
      return filteredList;
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
    * isCheckedValue: boolean
    */
    toggleList = isCheckedValue => {
      const updatedList = this.state.savedList.map(g => {
        const updatedGroupItems = g.items.map(i => ({...i, isChecked: i.submit ? isCheckedValue : i.isChecked }))
        return {...g, items: updatedGroupItems}
      })
      this.setState({ savedList: updatedList })
      const submitList = this.constructSubmitList(updatedList);
      this.setState({submitList: submitList})
    }

    /** Toggles modals. When modals are closed, resets savedList and submitList
    * to original state
    */
    toggleModal = modal  => {
      this.setState({ [modal]: {...this.state[modal], isOpen: !this.state[modal]["isOpen"], error: ""} })
      if (this.state[modal].isOpen) {
        this.toggleList(false)
      }
    }

    render() {
      return (
        <React.Fragment>
          <Helmet>
            <title>DIMES: My List</title>
          </Helmet>
          <div className="container mylist flex">
            <nav>
              <a href="/" className="btn btn--new-search">
                <MaterialIcon icon="keyboard_arrow_left"/>Start a New Search
              </a>
            </nav>
            <main id="main" role="main">
              <div className="mylist__header">
                <h1 className="mylist__title">My List</h1>
                <MyListDropdown
                  downloadCsv={this.downloadCsv}
                  duplicationRequest={() => this.toggleModal("duplication")}
                  emailList={() => this.toggleModal("email")}
                  readingRoomRequest={() => this.toggleModal("readingRoom")}
                  removeAllItems={() => this.toggleModal("confirmDeleteAll")}
                  sendEmail={this.sendEmail} />
              </div>
              <MyListExportActions
                  confirmDeleteAll={() => this.toggleModal("confirmDeleteAll")}
                  downloadCsv={this.downloadCsv}
                  emailList={() => this.toggleModal("email")}
                  isDownloading={this.state.isDownloading} />
              <SavedItemList
                items={this.state.savedList}
                isLoading={this.state.isLoading}
                removeFromList={this.removeFromList} />
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
            list={this.state.savedList}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("email")}
          />
          <ReadingRoomRequestModal
            {...this.state.readingRoom}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            isRestrictionsLoading={this.state.isRestrictionsLoading}
            list={this.state.savedList}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("readingRoom")}
          />
          <DuplicationRequestModal
            {...this.state.duplication}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleFormSubmit}
            isRestrictionsLoading={this.state.isRestrictionsLoading}
            list={this.state.savedList}
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
                <Button
                  className="btn--sm btn--orange"
                  label="Remove"
                  handleClick={() => {this.removeAllFromList(); this.toggleModal("confirmDeleteAll");}} />
                <Button
                  className="btn--sm btn--gray"
                  label="Cancel"
                  handleClick={() => this.toggleModal("confirmDeleteAll")}/>
              </div>
              </>
            }
            title="Confirm Remove All"
            toggleModal={() => this.toggleModal("confirmDeleteAll")}
          />
        </React.Fragment>
      );
    }
  }

  PageMyList.propTypes = {
    removeAllListItems: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
  }

  export default PageMyList;
