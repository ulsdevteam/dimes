import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import PageNotFound from "./PageNotFound";
import { AgentAttributeSkeleton, SearchSkeleton } from "./LoadingSkeleton";
import TileList from "./Tile";
import AgentAttributeList from "./AgentAttribute";
import "./Button/styles.scss";

const AgentDescription = ({ attributes }) => (
  attributes ?
  (<div className="agent__description">
    <h2 className="agent__section-title">Summary</h2>
    <AgentAttributeList items={attributes} />
  </div>) : (null)
)

const AgentRelatedCollections = ({ agentTitle, collections }) => (
  collections ?
  (<div className="agent__related">
    <h2 className="agent__section-title">Related Collections</h2>
    <TileList items={collections} />
    <a href={`/search/?query=${agentTitle}&category=collection`} className="btn btn--search-more">Search More Related Collections</a>
  </div>) : (null)
)

const AgentSidebar = ({ agents }) => (
  agents ?
  (<div className="agent__sidebar">
    <h2 className="agent__section-title">Related People and Organizations</h2>
    <TileList items={this.props.agents} />
  </div>) : (null)
)

class PageAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      isLoading: true,
      agent: {},
      collections: null,
      attributes: null,
      params: {}
    };
  };
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/agents/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ agent: res.data });
        this.fetchCollections();
        this.parseAgentAttributes();
        this.setState({ isLoading: false })
      })
      .catch(err => this.setState({ found: false }));
  };
  fetchCollections = () => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search/?query=${this.state.agent.title}&category=collection&limit=8`)
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
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{ this.state.agent.title }</title>
        </Helmet>
        <div className="container agent">
          <nav>
            <a href={`/search?${queryString.stringify(this.state.params)}`} className="btn btn--back">
              <span className="material-icons">keyboard_arrow_left</span>Back to Search
            </a>
          </nav>
          <main id="main" role="main">
            <h1 className="agent__title">{ this.state.agent.title || <Skeleton />}</h1>
            <p className="agent__subtitle">{ this.state.isLoading? (<Skeleton />) : (this.state.agent.description) }</p>
            {this.state.isLoading ? (<AgentAttributeSkeleton />) : (<AgentDescription attributes={this.state.attributes} />)}
            {this.state.isLoading ? (<SearchSkeleton />) : (<AgentRelatedCollections agentTitle={this.state.agent.title} collections={this.state.collections} />) }
          </main>
          <AgentSidebar related={this.state.agent.agents} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageAgent;
