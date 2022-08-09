  import React, { useEffect, useState } from 'react'
  import PropTypes from 'prop-types'
  import axios from 'axios'
  import { Helmet } from 'react-helmet'
  import PageBackendError from '../PageBackendError'
  import Button from '../Button'
  import { MyListDropdown } from '../Dropdown'
  import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from '../ModalMyList'
  import MaterialIcon from '../MaterialIcon'
  import ModalConfirm from '../ModalConfirm'
  import MyListExportActions from '../MyListExportActions'
  import MyListSidebar from '../MyListSidebar'
  import { SavedItemList } from '../SavedItem'
  import { fetchMyList } from '../MyListHelpers'
  import { firePageViewEvent } from '../Helpers'
  import './styles.scss'

  const PageMyList = ({ removeAllListItems, toggleInList }) => {

    const [backendError, setBackendError] = useState({})
    const [savedList, setSavedList] = useState([])
    const [submitList, setSubmitList] = useState([])
    const [isDownloading, setIsDownloading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isRequestingAvailable, setIsRequestingAvailable] = useState(false)
    const [duplicationModalOpen, setDuplicationModalOpen] = useState(false)
    const [emailModalOpen, setEmailModalOpen] = useState(false)
    const [readingRoomModalOpen, setReadingRoomModalOpen] = useState(false)
    const [requestingUnavailableModalOpen, setRequestingUnavailableModalOpen] = useState(false)
    const [confirmDeleteAllModalOpen, setConfirmDeleteAllModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [confirmModalTitle, setConfirmModalTitle] = useState('')
    const [confirmModalMessage, setConfirmModalMessage] = useState('')

    /** Returns a list of ArchivesSpace URIs for checked items in list */
    const constructSubmitList = (list, allItems) => {
      var submitList = [];
      for (const group of list) {
        for (const item of group.items) {
          if (allItems) {
            submitList.push(item.archivesspace_uri)
          } else {
            console.log(item);
            item && item.isChecked && submitList.push(item.archivesspace_uri)
          }
        }
      }
      return submitList
    }

    /* Requests CSV data and downloads a local file */
    const downloadCsv = () => {
      if (!isRequestingAvailable) {
        setRequestingUnavailableModalOpen(true)
        return;
      }
      setIsDownloading(true)
      axios
        .post(
          `${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/download-csv/`,
          {items: constructSubmitList(savedList, true)})
        .then(res => {
          const blob = new Blob([res.data], { type: 'text/csv' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `dimes-${new Date().toISOString()}.csv`
          link.click()
        })
        .catch(err => setBackendError(err))
        .then(() => setIsDownloading(false));
    }

    /**
    * Sets isChecked attribute on savedList based on checkbox input.
    * Updates submitList by filtering unchecked items.
    */
    const handleModalListChange = (e) => {
      const updatedList = setIsChecked(e, savedList)
      setSavedList(updatedList)
    }

    /** Sets messages in confirm modal */
    const handleConfirmData = (title, message) => {
      setConfirmModalTitle(title)
      setConfirmModalMessage(message)
    }

    /** Creates HTML input elements */
    const createInputElement = (key, value) => {
      const input = document.createElement('input')
      input.name = key
      input.setAttribute('value', value)
      return input
    }

    /* Handle the form submission for Aeon request (duplication and reading room) */
    const handleAeonFormSubmit = (uri, submitted) => {
      const loadingTitle = 'Preparing Request Data'
      const loadingMessage = <p className='loading-dots'>Preparing items for your request</p>
      handleConfirmData(loadingTitle, loadingMessage);
      setConfirmModalOpen(true)
      axios
        .post(uri, submitted)
        .then(res => {
          const form = document.createElement('form')
          form.action = 'https://pitt.aeon.atlas-sys.com/logon'
          form.method = 'post'
          Object.keys(res.data).forEach(key => {
            if (Array.isArray(res.data[key])) {
              res.data[key].forEach(v => {
                form.append(createInputElement(key, v))
              })
            } else {
              form.append(createInputElement(key, res.data[key]))
            }
          });
          document.body.appendChild(form);
          form.submit()
        })
        .catch(err => {
          const title = 'Error submitting request'
          const message = `There was an error submitting your request. The error message was: ${err.toString()}`
          handleConfirmData(title, message);
        })
    }

    /** Handles form submit for emails */
    const handleExportFormSubmit = (uri, submitted) => {
      const loadingTitle = 'Sending Email'
      const loadingMessage = <p className='loading-dots'>Adding items to your message</p>
      handleConfirmData(loadingTitle, loadingMessage);
      setConfirmModalOpen(true)
      axios
        .post(uri, submitted)
        .then(res => {
          const title = 'Email Sent'
          var message = <p>{`Selected items in your list have been emailed to ${submitted.email}`}</p>
          handleConfirmData(title, message);
        })
        .catch(err => {
          const title = 'Error submitting request'
          const message = `There was an error submitting your request. The error message was: ${err.toString()}`
          handleConfirmData(title, message);
        })
    }

    /** Fetches list data from localStorage and get complete data from mylist endpoint */
    const fetchList = () => {
      const list = fetchMyList();
      axios
        .post(`${process.env.REACT_APP_ARGO_BASEURL}/mylist`, { list: list })
        .then(res => {
          setSavedList(res.data)
        })
        .catch(err => setBackendError(err))
        .then(() => setIsLoading(false));
    }

    /** Remove all items from list */
    const removeAllFromList = () => {
      removeAllListItems();
      fetchList();
    }

    /** Remove single item from list */
    const removeFromList = item => {
      toggleInList(item);
      var filteredList = [];
      for (const group of savedList) {
        var newGroup = {...group}
        newGroup.items = group.items.filter(i => i.uri !== item.uri)
        newGroup.items.length && filteredList.push(newGroup);
      }
      setSavedList(filteredList)
    }

    /** Returns list with isChecked attributes set based on checkbox input. */
    const setIsChecked = (e, list) => {
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
    const toggleList = (isCheckedValue, ignoreRestrictions) => {
      const updatedList = savedList.map(g => {
        const updatedGroupItems = g.items.map(i => (
          {...i, isChecked: ignoreRestrictions || i.submit ? isCheckedValue : false }))
        return {...g, items: updatedGroupItems}
      })
      setSavedList(updatedList)
    }

    /** Fetch list data and ensure Request Broker is available on initial page load */
    useEffect(() => {
      fetchList()
      axios
        .get(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/status/`)
        .then(res => res.data.pong && setIsRequestingAvailable(true))
        .catch(err => console.log(err))
    }, [])

    /** Reset checked items when modals are closed or opened */
    useEffect(() => {
      toggleList(false)
    }, [emailModalOpen, readingRoomModalOpen, duplicationModalOpen])

    /** Update submitList when savedList changes */
    useEffect(() => {
      setSubmitList(constructSubmitList(savedList))
    }, [savedList])

    /** Updates submit and submitReason if requesting is available
    * 1. Resolve all promises before returning.
    */
    useEffect(() => {
      /* Resolves savedList groups */
      function resolveGroups(list) {
        return Promise.all( /* 1 */
          list.map(group => {
            return resolveItemsStatus(group)
          })
        )
      }
      /* Resolves submit status of items in savedList groups */
      async function resolveItemsStatus(group) {
        const updatedItems = await Promise.all( /* 1 */
          group.items.map(i => {
            return axios
              .post(`${process.env.REACT_APP_REQUEST_BROKER_BASEURL}/process-request/parse`, { item: i.archivesspace_uri })
              .then(res => {
                return { ...i, submit: res.data.submit, submitReason: res.data.submit_reason}
              })
              .catch(err => setBackendError(err))
          })
        )
        group.items = updatedItems
        return group
      }

      /* Resolve submit status */
      async function fetchData() {
        const updatedList = await resolveGroups(savedList)
        setSavedList(updatedList)
      }

      /* Calls the async function created above */
      if (savedList.length && isRequestingAvailable) {
        fetchData() /* 1 */
      }
    }, [savedList.length, isRequestingAvailable])

    if (!!Object.keys(backendError).length) {
      return <PageBackendError error={backendError} />
    }
    return (
      <>
        <Helmet
          onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
          <title>DIMES: My List</title>
        </Helmet>
        <div className='container mylist flex'>
          <main id='main' role='main'>
            <div className='mylist__header'>
              <h1 className='mylist__title'>My List</h1>
              <MyListDropdown
                downloadCsv={downloadCsv}
                duplicationRequest={() => isRequestingAvailable ? setDuplicationModalOpen(true) : setRequestingUnavailableModalOpen(true)}
                emailList={() => isRequestingAvailable ? setEmailModalOpen(true) : setRequestingUnavailableModalOpen(true)}
                readingRoomRequest={() => isRequestingAvailable ? setReadingRoomModalOpen(true) : setRequestingUnavailableModalOpen(true)}
                removeAllItems={() => setConfirmDeleteAllModalOpen(true)} />
            </div>
            <MyListExportActions
                confirmDeleteAll={() => setConfirmDeleteAllModalOpen(true)}
                downloadCsv={downloadCsv}
                emailList={() => isRequestingAvailable ? setEmailModalOpen(true) : setRequestingUnavailableModalOpen(true)}
                isDownloading={isDownloading} />
            <SavedItemList
              items={savedList}
              isLoading={isLoading}
              removeFromList={removeFromList} />
          </main>
          <MyListSidebar
              duplicationRequest={() => isRequestingAvailable ? setDuplicationModalOpen(true) : setRequestingUnavailableModalOpen(true)}
              readingRoomRequest={() => isRequestingAvailable ? setReadingRoomModalOpen(true) : setRequestingUnavailableModalOpen(true)} />
        </div>
        <EmailModal
          isOpen={emailModalOpen}
          handleChange={handleModalListChange}
          handleFormSubmit={handleExportFormSubmit}
          list={savedList}
          submitList={submitList}
          toggleList={toggleList}
          toggleModal={() => setEmailModalOpen(!emailModalOpen)}
        />
        <ReadingRoomRequestModal
          isOpen={readingRoomModalOpen}
          handleChange={handleModalListChange}
          handleFormSubmit={handleAeonFormSubmit}
          list={savedList}
          submitList={submitList}
          toggleList={toggleList}
          toggleModal={() => setReadingRoomModalOpen(!readingRoomModalOpen)}
        />
        <DuplicationRequestModal
          isOpen={duplicationModalOpen}
          handleChange={handleModalListChange}
          handleFormSubmit={handleAeonFormSubmit}
          list={savedList}
          submitList={submitList}
          toggleList={toggleList}
          toggleModal={() => setDuplicationModalOpen(!duplicationModalOpen)}
        />
        <ModalConfirm
          isOpen={requestingUnavailableModalOpen}
          message="Sorry, our system is unable to process requests right now. We're working to fix this! Please try again later."
          title="Can't Complete Request"
          toggleModal={() => setRequestingUnavailableModalOpen(!requestingUnavailableModalOpen)}
        />
        <ModalConfirm
          isOpen={confirmModalOpen}
          message={confirmModalMessage}
          title={confirmModalTitle}
          toggleModal={() => setConfirmModalOpen(!confirmModalOpen)}
        />
        <ModalConfirm
          isOpen={confirmDeleteAllModalOpen}
          message={
            <>Are you sure you want to remove all the items from your list?
            <div className='confirm-buttons'>
              <Button
                className='btn--sm btn--gold'
                label='Remove'
                handleClick={() => {removeAllFromList(); setConfirmDeleteAllModalOpen(false)}} />
              <Button
                className='btn--sm btn--gray'
                label='Cancel'
                handleClick={() => setConfirmDeleteAllModalOpen(false)}/>
            </div>
            </>
          }
          title='Confirm Remove All'
          toggleModal={() => setConfirmDeleteAllModalOpen(!confirmDeleteAllModalOpen)}
        />
      </>
    );
  }

  PageMyList.propTypes = {
    removeAllListItems: PropTypes.func.isRequired,
    toggleInList: PropTypes.func.isRequired,
  }

  export default PageMyList
