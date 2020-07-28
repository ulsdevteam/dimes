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
  // TODO: add onClick handler to search more button
  render() {
    if (!this.props.collections) {
      return null;
    }
    return (
      <div className="agent__related">
        <h2 className="agent__section-title">Related Collections</h2>
        <TileList items={this.props.collections} />
        <Button
          className="btn--search-more"
          label="Search More Related Collections" />
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
      agent: {},
      collections: null
    };
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/agents/${this.props.match.params.id}`)
      .then(res => {this.setState({ agent: res.data }); this.fetchCollections()})
      .catch(err => this.setState({ found: false }));
  };
  fetchCollections() {
    axios
      .get(`http://localhost:8000/collections/?query=${this.state.agent.title}&level=collection`)
      .then(res => {console.log(res); this.setState({ collections: res.data.results })})
      .catch(err => this.setState({ found: false }));
  }
  render() {
    // TODO: add onClick handler to Back to Search button
    // TODO: CSS animation to make addition of related collections less jerky
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <div className="container agent" role="main">
        <Button
          className="btn--back"
          iconBefore="<"
          label="Back to Search" />
        <div className="main" role="main">
          <h1 className="agent__title">{ this.state.agent.title }</h1>
          <p className="agent__subtitle"></p>
          <AgentDescription agent={this.state.agent} />
          <AgentRelatedCollections collections={this.state.collections} />
        </div>
        <AgentSidebar related={this.state.agent.agents} />
      </div>
    )
  }
}

export default PageAgent;
