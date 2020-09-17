import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import CollectionContext from "../CollectionContext";
import CollectionDetail from "../CollectionDetail";
import PageNotFound from "../PageNotFound";

class PageCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
          <CollectionDetail collection={this.state.collection} />
          <CollectionContext collection={this.state.collection} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageCollection;
