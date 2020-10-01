import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ContextSwitcher from "../ContextSwitcher";
import RecordsContent from "../RecordsContent";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";


class PageCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isContentShown: false,
      isLoading: true,
      isSaved: false,
      found: true,
      collection: { title: "" },
      activeRecords: { title: "" },
      params: {}
    }
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({ collection: res.data })
        this.setState({ activeRecords: res.data });
        this.setState({ isSaved: this.isSaved(res.data)})
        this.setState({ isLoading: false });
      })
      .catch(err => this.setState({ found: false }));
  };

  /** Saves item to MyList
  * Items are saved within an object corresponding to a top-level collection
  */
  saveItem = (itemUri, groupUri) => {
    var list = this.props.fetchMyList()
    if (!list[groupUri]) {
      list[groupUri] = {}
    }
    if (!list[groupUri][itemUri]) {
      list[groupUri][itemUri] = {"saved": Date.now()}
      this.props.saveMyList(list)
    }
  }

  isSaved = item => {
    const list = this.props.fetchMyList()
    return list[item.group.identifier] && list[item.group.identifier][item.uri] ? true : false
  }

  setActiveRecords = records => {
    this.setState({ activeRecords: records })
  }

  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  toggleSaved = item => {
    this.setState({ isSaved: !this.state.isSaved })
  }

  render() {
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{ this.state.activeRecords.title }</title>
        </Helmet>
        <div className="container--full-width">
          <ContextSwitcher
            isContentShown={this.state.isContentShown}
            toggleIsContentShown={this.toggleIsContentShown} />
          <RecordsDetail
            activeRecords={this.state.activeRecords}
            isContentShown={this.state.isContentShown}
            isLoading={this.state.isLoading}
            isSaved={this.state.isSaved}
            params={this.state.params}
            removeItem={this.props.removeItem}
            saveItem={this.saveItem}
            toggleSaved={this.toggleSaved} />
          <RecordsContent
            isContentShown={this.state.isContentShown}
            isLoading={this.state.isLoading}
            params={this.state.params}
            parent={this.state.collection}
            setActiveRecords={this.setActiveRecords}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageCollection;
