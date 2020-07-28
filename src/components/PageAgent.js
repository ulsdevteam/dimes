import React, { Component } from "react";
import axios from "axios";
import PageNotFound from "./PageNotFound";
import TileList from "./Tile";
import Button from "./Button";

class AgentDescription extends Component {
  render() {
    // TODO: some conditional rendering here
    return (
      <div className="agent__description">
        <h2 className="agent__section-title">Summary</h2>
        <div className="agent__attributes"></div>
        <div className="agent__notes"></div>
      </div>
    )
  }
}

class AgentRelatedCollections extends Component {
  render() {
    if (!this.props.collections) {
      return null;
    }
    return (
      <div className="agent__related">
        <h2 className="agent__section-title">Related Collections</h2>
        <TileList items={this.props.collections} />
        <Button label="Search More Related Collections" />
      </div>
    )
  }
}

class AgentSidebar extends Component {
  render() {
    if (!this.props.agents) {
      return null;
    }
    return (
      <div className="agent__sidebar">
        <h2 className="agent__section-title">Related People and Organizations</h2>
        <TileList items={this.props.agents} />
      </div>
    )
  }
}

class PageAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      data: {}
    };
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/agents/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ found: false }));
  };
  render() {
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <div className="container agent">
        <Button label="Back to Search" />
        <div className="main" role="main">
          <h1>{ this.state.data.title }</h1>
          <p className="agent__subtitle"></p>
          <AgentDescription agent={this.state.data} />
          <AgentRelatedCollections collections={this.state.data.collections} />
        </div>
        <AgentSidebar related={this.state.data.agents} />
      </div>
    )
  }
}

export default PageAgent;
