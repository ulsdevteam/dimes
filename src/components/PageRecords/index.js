import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import RecordsContext from "../RecordsContext";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";

class PageCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isSaved: false,
      found: true,
      records: { title: "" },
      params: {}
    }
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({ records: res.data });
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
    this.setState({ records: records })
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
          <title>{ this.state.records.title }</title>
        </Helmet>
        <div className="container--full-width">
          <RecordsDetail
            records={this.state.records}
            isLoading={this.state.isLoading}
            isSaved={this.state.isSaved}
            params={this.state.params}
            removeItem={this.props.removeItem}
            saveItem={this.saveItem}
            toggleSaved={this.toggleSaved} />
          <RecordsContext
            records={this.state.records}
            isLoading={this.state.isLoading}
            params={this.state.params}
            setActiveRecords={this.setActiveRecords} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageCollection;
