import React, { Component } from "react";
import axios from "axios";
import PageNotFound from "./PageNotFound"

class PageAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      title: ""
    };
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3000/foo/${this.props.match.params.id}`)
      .then(res => this.setState({ activeMap: res.data }))
      .catch(err => this.setState({ found: false }));
  };
  render() {
    return (
      this.state.found ?
        (<div>
            <h1>Person, Organization, or Family</h1>
          </div>) :
        (<PageNotFound />)
    )
  }
}

export default PageAgent;
