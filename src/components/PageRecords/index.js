import React, { Component } from "react";
import { LiveMessage } from "react-aria-live";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ContextSwitcher from "../ContextSwitcher";
import RecordsContent from "../RecordsContent";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";
import { appendParams, formatBytes } from "../Helpers";


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
      item: {},
      params: {},
      preExpanded: [],
      updateMessage: ""
    }
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({...this.props.location.state})
      this.setState({ isItemLoading: false });
    }
    const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}`
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    this.getItemData(itemUrl, params, true)
  };

  /** Fetches item data, including ancestors and collection children */
  getItemData = (itemUrl, params, initial=false) => {
    this.setState({isItemLoading: true})
    this.setState({isAncestorsLoading: true})
    const childrenParams = {...params, limit: 5}
    const itemPath = itemUrl.replace(`${process.env.REACT_APP_ARGO_BASEURL}`, "")
    axios
      .get(appendParams(itemUrl, params))
      .then(res => {
        this.setState({ item: res.data });
        if (res.data.online) {
          axios
            .head(`${process.env.REACT_APP_S3_BASEURL}/pdfs/${res.data.uri.split("/").pop()}`)
            .then(res => {
              this.setState({ downloadSize: formatBytes(res.headers["content-length"]) })
            })
            .catch(e => {
              this.setState({ downloadSize: "" })
            })
        }
        this.setState({ updateMessage: `Details under heading 1 have been updated to describe the selected records titled ${res.data.title}`})
        this.setUrl(appendParams(itemPath, this.state.params), res.data);
      })
      .catch(err => this.setState({ found: false }))
      .then(() => this.setState({isItemLoading: false}));
    axios
      .get(appendParams(`${itemUrl}/ancestors`, params))
      .then(res => {
        this.setState({ ancestors: res.data })
        if (initial) {
          const itemUrl = `/${this.props.match.params.type}/${this.props.match.params.id}`
          const collectionUrl = Object.keys(res.data).length ? res.data.uri : itemUrl
          collectionUrl.includes("collections") && this.getPage(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}${collectionUrl}/children`, childrenParams))
          this.setState({ preExpanded: this.preExpanded(res.data, [itemUrl]) })
        }
      })
      .catch(e => console.log(e))
      .then(() => this.setState({isAncestorsLoading: false}));
  }

  /** Fetches paged content */
  getPage = uri => {
    axios
      .get(uri)
      .then(res => {
          this.setState({ children: [...this.state.children].concat(res.data.results)});
          this.state.isChildrenLoading && this.setState({ isChildrenLoading: false });
          res.data.next && this.getPage(res.data.next)
      }
    )
    .catch(err => console.log(err))
  }

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
      const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}${uri}`
      this.getItemData(itemUrl, this.state.params)
    }
  }

  /** Pushes a URL and state into browser history */
  setUrl = (uri, itemData) => {
    this.props.history.push(uri, {...this.state, item: itemData})
  }

  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  render() {
    const { myListCount, toggleInList } = this.props;
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <LiveMessage message={this.state.updateMessage} aria-live="polite" />
        <Helmet>
          <title>{ this.state.item.title }</title>
        </Helmet>
        <div className="container--full-width">
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
            toggleInList={toggleInList} />
          <RecordsContent
            children={this.state.children}
            collection={this.parseCollection()}
            isContentShown={this.state.isContentShown}
            myListCount={this.props.myListCount}
            params={this.state.params}
            parent={this.state.item}
            preExpanded={this.state.preExpanded}
            setActiveRecords={this.setActiveRecords}
            toggleInList={toggleInList}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

PageRecords.propTypes = {
  myListCount: PropTypes.number.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;
