import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import RecordsContext from "../RecordsContext";
import CollectionDetail from "../CollectionDetail";
import PageNotFound from "../PageNotFound";

class PageCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      found: true,
      collection: { title: "" },
      params: {}
    }
  }
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/collections/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ collection: res.data });
        this.setState({ isLoading: false });
      })
      .catch(err => this.setState({ found: false }));
  };
  render() {
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{ this.state.collection.title }</title>
        </Helmet>
        <div className="container--full-width">
          <CollectionDetail collection={this.state.collection} isLoading={this.state.isLoading} />
          <RecordsContext records={this.state.collection} isLoading={this.state.isLoading} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageCollection;
