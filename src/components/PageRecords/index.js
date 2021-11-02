import React, { Component } from "react";
import { LiveMessage } from 'react-aria-live'
import PropTypes from 'prop-types'
import axios from 'axios'
import queryString from 'query-string'
import { browserHistory } from 'react-router';
import { Helmet } from 'react-helmet'
import ContextSwitcher from '../ContextSwitcher'
import Minimap from '../Minimap'
import MinimapButton from '../MinimapButton'
import { ModalMinimap, ModalMinimapInfo } from '../ModalMinimap'
import RecordsContent from '../RecordsContent'
import RecordsDetail from '../RecordsDetail'
import PageNotFound from '../PageNotFound'
import { appendParams, firePageViewEvent, formatBytes, isDesktop } from '../Helpers'

class PageRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ancestors: {},
      children: [],
      downloadSize: "",
      found: true,
      isAncestorsLoading: true,
      isChildrenLoading: true,
      isContentShown: false,
      isItemLoading: true,
      isMinimapLoading: true,
      isMinimapModalOpen: false,
      isMinimapInfoModalOpen: false,
      item: {},
      minimap: {"hits": []},
      params: {},
      preExpanded: [],
      updateMessage: ""
    }
  }

  componentDidMount() {
    this.loadData()
    /** Handle navigation using browser back button
    * 1. Remove children to prevent creation of duplicates.
    * 2. Call with false setUrl parameter.
    */
    this.props.history.listen((location, action) => {
      if (action === "POP") {
        this.setState({children: []}) /* 1 */
        this.loadData(false) /* 2 */
      }
    });
  };

  /** Get and set item data
  * 1. Don't add URL to history if this action is triggered by the browser back button
  */
  loadData = (shouldSetUrl = true) => {
    const itemPath = `/${this.props.match.params.type}/${this.props.match.params.id}/`
    const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}${itemPath}`
    const params = queryString.parse(this.props.location.search, {parseBooleans: true});
    this.setState({ params: params })
    this.getItemData(itemUrl, params, true, shouldSetUrl) /* 1 */
  }

  /** Fetches item data, including ancestors and collection children */
  getItemData = (itemUrl, params, initialLoad = false, shouldSetUrl) => {
    this.setState({isItemLoading: true})
    this.setState({isAncestorsLoading: true})
    this.setState({ downloadSize: '' })
    const pageSize = 5
    const childrenParams = {...params, limit: pageSize}
    const itemPath = itemUrl.replace(`${process.env.REACT_APP_ARGO_BASEURL}`, '')
    axios
        .get(appendParams(itemUrl, params))
        .then(res => {
          this.setState({ item: res.data })
          if (res.data.online) {
            axios
              .head(`${process.env.REACT_APP_S3_BASEURL}/pdfs/${res.data.uri.split('/').pop()}`)
              .then(res => {
                this.setState({ downloadSize: formatBytes(res.headers['content-length']) })
              })
              .catch(e => {
                this.setState({ downloadSize: '' })
              })
          }
          if (initialLoad) {
            this.getPage(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}${res.data.group.identifier}/children/`, childrenParams))
          }
          this.setState({ updateMessage: `Details under heading 1 have been updated to describe the selected records titled ${res.data.title}`})
          this.getMinimap(res.data.group.identifier, params)
        })
        .catch(err => this.setState({ found: false }))
        .then(res => {
          this.setState({isItemLoading: false})
          shouldSetUrl && this.setUrl(appendParams(itemPath, this.state.params))
        })
    axios
        .get(appendParams(`${itemUrl}ancestors/`, params))
        .then(res => {
          this.setState({ ancestors: res.data })
          if (initialLoad) {
            this.setState({ preExpanded: this.preExpanded(res.data, [itemPath]) })
          }
        })
        .catch(e => console.log(e))
        .then(() => this.setState({isAncestorsLoading: false}))
  }

  /** Fetches paged content */
  getPage = uri => {
    axios
        .get(uri)
        .then(res => {
          this.setState({ children: [...this.state.children].concat(res.data.results)})
          this.state.isChildrenLoading && this.setState({ isChildrenLoading: false })
          res.data.next && this.getPage(res.data.next)
        }
      )
      .catch(err => console.log(err))
  }

  getMinimap = (collectionUri, params) => {
    if (Object.keys(params).length === 0) {
      this.setState({ isMinimapLoading: false })
    } else {
      axios
        .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}${collectionUri}/minimap/`, params))
        .then(res => this.setState({ minimap: res.data }))
        .catch(e => console.log(e))
        .then(() => this.setState({ isMinimapLoading: false }))
      }
  }

  /** Constructs a preExpanded list based on an item's ancestors */
  preExpanded = (ancestors, list) => {
    Object.keys(ancestors).length && list.push(ancestors.uri)
    return ancestors.child ? this.preExpanded(ancestors.child, list) : list
  }

  /** Returns the first ancestor or the item if no ancestors are present */
  parseCollection = () => {
    return Object.keys(this.state.ancestors).length ? this.state.ancestors : this.state.item
  }

  /** Updates state with item found at URL. */
  setActiveRecords = uri => {
    if (uri !== this.state.item.uri) {
      const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}${uri}/`
      this.getItemData(itemUrl, this.state.params)
    }
  }

  /** Pushes a URL and state into browser history */
  setUrl = (uri) => {
    this.props.history.push(uri, { ...this.state })
  }

  /** Show or hide the RecordsContent on mobile */
  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  toggleMinimapModal = () => {
    this.setState({ isMinimapModalOpen: !this.state.isMinimapModalOpen })
  }

  toggleMinimapInfoModal = () => {
    console.log("here");
    this.setState({ isMinimapInfoModalOpen: !this.state.isMinimapInfoModalOpen })
  }

  render() {
    const { myListCount, toggleInList } = this.props;
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <LiveMessage message={this.state.updateMessage} aria-live='polite' />
        <Helmet
          onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
          <title>{ this.state.item.title }</title>
        </Helmet>
        <div className='container--full-width'>
          {isDesktop ? null : <MinimapButton toggleMinimapModal={this.toggleMinimapModal}/>}
          <ContextSwitcher
            isContentShown={this.state.isContentShown}
            toggleIsContentShown={this.toggleIsContentShown} />
          <RecordsDetail
            ancestors={this.state.ancestors}
            downloadSize={this.state.downloadSize}
            isAncestorsLoading={this.state.isAncestorsLoading}
            isContentShown={this.state.isContentShown}
            isItemLoading={this.state.isItemLoading}
            item={this.state.item}
            myListCount={myListCount}
            params={this.state.params}
            toggleInList={toggleInList}
            toggleMinimapModal={this.toggleMinimapInfoModal} />
          {isDesktop ?
            <div className='minimap__wrapper'>
              <Minimap
                data={this.state.minimap}
                isLoading={this.state.isMinimapLoading}
                params={this.state.params} />
            </div>
            : null}
          <RecordsContent
            children={this.state.children}
            collection={this.parseCollection()}
            isContentShown={this.state.isContentShown}
            myListCount={this.props.myListCount}
            offsetAfter={this.state.item.offset + 1}
            offsetBefore={this.state.item.offset}
            params={this.state.params}
            parent={this.state.item}
            preExpanded={this.state.preExpanded}
            setActiveRecords={this.setActiveRecords}
            toggleInList={toggleInList}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
        <ModalMinimapInfo
          isOpen={this.state.isMinimapInfoModalOpen}
          toggleModal={this.toggleMinimapInfoModal} />
        <ModalMinimap
          data={this.state.minimap}
          isLoading={this.state.isMinimapLoading}
          isOpen={this.state.isMinimapModalOpen}
          params={this.state.params}
          toggleModal={this.toggleMinimapModal} />
      </React.Fragment>
    )
  }
}

PageRecords.propTypes = {
  myListCount: PropTypes.number.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;
