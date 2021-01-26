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
  import { firePageViewEvent } from "../Helpers";
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
        isRequestingAvailable: false,
        email: {isOpen: false},
        readingRoom: {isOpen: false},
        requestingUnavailable: {isOpen: false},
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
      firePageViewEvent()
      axios
        .get(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/status/health/ping`)
        .then(res => res.data.pong && this.setState({ isRequestingAvailable: true }))
        .catch(err => console.log(err))
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
      if (!this.state.isRequestingAvailable) {
        this.toggleModal("requestingUnavailable");
        return;
      }
      this.setState({ isDownloading: true })
      axios
        .post(
          `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/download-csv/`,
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

    createInputElement = (key, value) => {
      const input = document.createElement("input")
      input.name = key
      input.setAttribute("value", value)
      return input
    }

    handleAeonFormSubmit = (uri, submitted, modal) => {
      this.toggleModal(modal);
      const loadingTitle = "Preparing Request Data"
      const loadingMessage = <p className="loading-dots">Preparing items for your request</p>
      this.handleConfirmData(loadingTitle, loadingMessage);
      this.toggleModal("confirm");
      axios
        .post(uri, submitted)
        .then(res => {
          const form = document.createElement("form")
          form.action = "https://raccess.rockarch.org/aeon.dll"
          form.method = "post"
          Object.keys(res.data).forEach(key => {
            if (Array.isArray(res.data[key])) {
              res.data[key].forEach(v => {
                form.append(this.createInputElement(key, v))
              })
            } else {
              form.append(this.createInputElement(key, res.data[key]))
            }
          });
          document.body.appendChild(form);
          form.submit()
        })
        .catch(err => {
          console.log(err)
          const title = "Error submitting request"
          const message = `There was an error submitting your request. The error message was: ${err.toString()}`
          this.handleConfirmData(title, message);
        })
    }

    handleExportFormSubmit = (uri, submitted, modal) => {
      this.toggleModal(modal);
      const loadingTitle = "Sending Email"
      const loadingMessage = <p className="loading-dots">Adding items to your message</p>
      this.handleConfirmData(loadingTitle, loadingMessage);
      this.toggleModal("confirm");
      axios
        .post(uri, submitted)
        .then(res => {
          const title = "Email Sent"
          var message = <p>{`Selected items in your list have been emailed to ${submitted.email}`}</p>
          this.handleConfirmData(title, message);
        })
        .catch(err => {
          console.log(err)
          const title = "Error submitting request"
          const message = `There was an error submitting your request. The error message was: ${err.toString()}`
          this.handleConfirmData(title, message);
        })
    }

    fetchList = () => {
      const list = fetchMyList();
      axios
        .post(`${process.env.REACT_APP_ARGO_BASEURL}/mylist`, {list: list})
        .then(res => {
          this.setState({ savedList: res.data, submitList: this.constructSubmitList(res.data) })
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

    setSubmit = (uri, submitValue, submitReason) => {
      const updatedList = this.state.savedList.map(g => {
        const updatedGroupItems = g.items.map(i => (
          {...i, submit: i.uri === uri ? submitValue : i.submit, submitReason: i.uri === uri ? submitReason : i.submitReason}))
        return {...g, items: updatedGroupItems}
      })
      this.setState({ savedList: updatedList })
    }

    /** Returns list with isChecked attributes set based on checkbox input. */
    setIsChecked = (e, list) => {
      const updatedList = list.map(g => {
        const updatedGroupItems = g.items.map(i => (
          {...i, isChecked: i.uri === e.target.id ? e.target.checked : i.isChecked }))
        return {...g, items: updatedGroupItems}
      })
      return updatedList
    }

    /** Checks or unchecks all items in list, depending on value passed to function
    * isCheckedValue: boolean
    */
    toggleList = (isCheckedValue, ignoreRestrictions) => {
      const updatedList = this.state.savedList.map(g => {
        const updatedGroupItems = g.items.map(i => (
          {...i, isChecked: ignoreRestrictions || i.submit ? isCheckedValue : false }))
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
      if ((["duplication", "email", "readingRoom"].includes(modal)) && !this.state.isRequestingAvailable) {
        this.toggleModal("requestingUnavailable");
        return;
      }
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
                  removeAllItems={() => this.toggleModal("confirmDeleteAll")} />
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
                readingRoomRequest={() => this.toggleModal("readingRoom")} />
          </div>
          <EmailModal
            {...this.state.email}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleExportFormSubmit}
            list={this.state.savedList}
            setSubmit={this.setSubmit}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("email")}
          />
          <ReadingRoomRequestModal
            {...this.state.readingRoom}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleAeonFormSubmit}
            list={this.state.savedList}
            setSubmit={this.setSubmit}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("readingRoom")}
          />
          <DuplicationRequestModal
            {...this.state.duplication}
            handleChange={this.handleModalListChange}
            handleFormSubmit={this.handleAeonFormSubmit}
            list={this.state.savedList}
            setSubmit={this.setSubmit}
            submitList={this.state.submitList}
            toggleList={this.toggleList}
            toggleModal={() => this.toggleModal("duplication")}
          />
          <ModalConfirm
            {...this.state.requestingUnavailable}
            message="Sorry, our system is unable to process requests right now. We're working to fix this! Please try again later."
            title="Can't Complete Request"
            toggleModal={() => this.toggleModal("requestingUnavailable")}
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
