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
import { appendParams } from "../Helpers";


class PageRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      ancestors: {},
      children: [],
      found: true,
      isAncestorsLoading: true,
      isChildrenLoading: true,
      isContentShown: false,
      isItemLoading: true,
      params: {},
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
    const childrenParams = {...params, limit: 5}
    this.setState({ params: params })
    this.getItemData(itemUrl, params)
    this.getPage(appendParams(`${itemUrl}/children`, childrenParams))
  };

  getItemData = (itemUrl, params) => {
    this.setState({isItemLoading: true})
    this.setState({isAncestorsLoading: true})
    const itemPath = itemUrl.replace(`${process.env.REACT_APP_ARGO_BASEURL}`, "")
    axios
      .get(appendParams(itemUrl, params))
      .then(res => {
        this.setState({ item: res.data });
        this.setState({ updateMessage: `Details under heading 1 have been updated to describe the selected records titled ${res.data.title}`})
        this.setUrl(appendParams(itemPath, this.state.params), res.data);
      })
      .catch(err => this.setState({ found: false }))
      .then(() => this.setState({isItemLoading: false}));
    axios
      .get(appendParams(`${itemUrl}/ancestors`, params))
      .then(res => {
        this.setState({ ancestors: res.data })
      })
      .catch(e => console.log(e))
      .then(() => this.setState({isAncestorsLoading: false}));
  }

  getPage = uri => {
    console.log(uri)
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
    const { savedList, toggleInList } = this.props;
    const collection = this.parseCollection();
    console.log(collection)
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
            isAncestorsLoading={this.state.isAncestorsLoading}
            isContentShown={this.state.isContentShown}
            isItemLoading={this.state.isItemLoading}
            item={this.state.item}
            params={this.state.params}
            savedList={savedList}
            toggleInList={toggleInList} />
          <RecordsContent
            children={this.state.children}
            collection={collection}
            isContentShown={this.state.isContentShown}
            params={this.state.params}
            parent={this.state.item}
            savedList={savedList}
            setActiveRecords={this.setActiveRecords}
            toggleInList={toggleInList}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

PageRecords.propTypes = {
  savedList: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;
