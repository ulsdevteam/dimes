import React, { Component } from "react";
import axios from "axios";
import PageNotFound from "./PageNotFound";
import TileList from "./Tile";
import Button from "./Button";
import Link  from "./Link";
import AgentAttributeList from "./AgentAttribute";

class AgentDescription extends Component {
  render() {
    if (!this.props.attributes) {
      return null;
    }
    return (
      <div className="agent__description">
        <h2 className="agent__section-title">Summary</h2>
        <AgentAttributeList items={this.props.attributes} />
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
        <Link
          className="btn btn--search-more"
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
      collections: null,
      attributes: null
    };
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/agents/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ agent: res.data });
        this.fetchCollections();
        this.parseAgentAttributes();
      })
      .catch(err => this.setState({ found: false }));
  };
  fetchCollections = () => {
    axios
      .get(`http://localhost:8000/collections/?query=${this.state.agent.title}&limit=6&ancestors__isnull=true`)
      .then(res => this.setState({collections: res.data.results}))
      .catch(err => console.log(err));
  }
  parseAgentAttributes = () => {
    const items = [];
    const agentType = this.state.agent.agent_type
    if (this.state.agent.dates) {
      this.state.agent.dates.forEach(date => {
          items.push({"label": agentType === "organization" ? "Date Established" : "Date of Birth", "value": date.begin, "note": false})
          items.push({"label": agentType === "organization" ? "Date Disbanded" : "Date of Death", "value": date.end, "note": false})
      });
    }
    if (this.state.agent.notes) {
      this.state.agent.notes.forEach(note => {
        let content = "";
        note.subnotes.forEach(subnote => {
          content += subnote.content
        });
        items.push({"label": "Description", "value": content, "note": true})
      });
    }
    this.setState({attributes: items});
  }
  render() {
    // TODO: add onClick handler to Back to Search button
    // TODO: CSS animation to make addition of related collections and agent attributes less jerky
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <div className="container agent">
        <nav>
          <Link
            className="btn btn--back"
            label="< Back to Search" />
        </nav>
        <main id="main" role="main">
          <h1 className="agent__title">{ this.state.agent.title }</h1>
          <p className="agent__subtitle">{ this.state.agent.description }</p>
          <AgentDescription attributes={this.state.attributes} />
          <AgentRelatedCollections collections={this.state.collections} />
        </main>
        <AgentSidebar related={this.state.agent.agents} />
      </div>
    )
  }
}

export default PageAgent;
