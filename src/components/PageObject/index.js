import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ObjectContext from "../ObjectContext";
import ObjectDetail from "../ObjectDetail";
import PageNotFound from "../PageNotFound";

class PageObject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      found: true,
      object: { title: "" },
      params: {}
    }
  }
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/objects/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ object: res.data });
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
          <title>{ this.state.object.title }</title>
        </Helmet>
        <div className="container--full-width">
          <ObjectDetail object={this.state.object} />
          <ObjectContext object={this.state.object} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageObject;
