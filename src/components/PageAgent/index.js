import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import PageNotFound from "../PageNotFound";
import { AgentAttributeSkeleton, SearchSkeleton } from "../LoadingSkeleton";
import TileList from "../Tile";
import AgentAttributeList from "../AgentAttribute";
import "../Button/styles.scss";
import { appendParams, firePageViewEvent } from "../Helpers";

const AgentDescription = ({ attributes }) => (
  attributes.length ?
  (<div className="agent__description">
    <h2 className="agent__section-title">Summary</h2>
    <AgentAttributeList items={attributes} />
  </div>) : (null)
)

const AgentRelatedCollections = ({ agentTitle, collections, params }) => (
  collections.length ?
  (<div className="agent__related">
    <h2 className="agent__section-title">Related Collections</h2>
    <TileList hideHitCount={true} items={collections} params={params} />
    { collections.length === 8 ?
      (<a href={`/search/?query=${agentTitle}&category=collection`} className="btn btn--search-more">Search More Related Collections</a>) :
      (null)
    }
  </div>) : (null)
)

const AgentSidebar = ({ agents }) => (
  agents ?
  (<div className="agent__sidebar">
    <h2 className="agent__section-title">Related People and Organizations</h2>
    <TileList hideHitCount={true} items={this.props.agents} />
  </div>) : (null)
)

class PageAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: true,
      isAgentLoading: true,
      isAttributesLoading: true,
      isCollectionsLoading: true,
      agent: {},
      collections: [],
      attributes: [],
      params: {}
    };
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/agents/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ agent: res.data });
        this.fetchCollections();
        this.parseAgentAttributes();
        this.setState({ isAgentLoading: false })
      })
      .catch(err => this.setState({ found: false }))
      .then(() => firePageViewEvent());
  }

  fetchCollections = () => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search/?query=${this.state.agent.title}&category=collection&limit=8`)
      .then(res => {
        this.setState({ collections: res.data.results })
        this.setState({ isCollectionsLoading: false })
      })
      .catch(err => console.log(err));
  }

  parseAgentAttributes = () => {
    const agentType = this.state.agent.agent_type
    const startDates = this.state.agent.dates ? this.state.agent.dates.map(date => (
      {label: agentType === "organization" ? "Date Established" : "Date of Birth", value: date.begin, note: false}
    )) : []
    const endDates = this.state.agent.dates ? this.state.agent.dates.map(date => (
      {label: agentType === "organization" ? "Date Disbanded" : "Date of Death", value: date.end, note: false}
    )) : []
    const noteText = this.state.agent.notes ? this.state.agent.notes.map(note => (
      {label: "Description", value: note.subnotes.map(s => s.content).join("\r\n"), note: true}
    )) : []
    this.setState({ attributes: startDates.concat(endDates).concat(noteText) });
    this.setState({ isAttributesLoading: false })
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
            <a href={appendParams("/search", this.state.params)} className="btn btn--back">
              <span className="material-icons">keyboard_arrow_left</span>Back to Search
            </a>
          </nav>
          <main id="main" role="main">
            <h1 className="agent__title">{ this.state.agent.title || <Skeleton />}</h1>
            <p className="agent__subtitle">{ this.state.isAgentLoading?
              (<Skeleton />) :
              (this.state.agent.description) }
            </p>
            {this.state.isAttributesLoading ?
              (<AgentAttributeSkeleton />) :
              (<AgentDescription attributes={this.state.attributes} />)}
            {this.state.isCollectionsLoading ?
              (<SearchSkeleton />) :
              (<AgentRelatedCollections
                agentTitle={this.state.agent.title}
                collections={this.state.collections}
                params={{...this.state.params, category: ""}} />) }
          </main>
          <AgentSidebar related={this.state.agent.agents} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageAgent;
