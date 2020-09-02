import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import {Helmet} from "react-helmet";
import Search from "./Search";
import TileList from "./Tile";

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      query: this.parseParams(this.props.location.search).query
    };
  };
  componentDidMount() {
    this.toggleInProgress()
    this.parseParams(this.props.location.search)
    this.executeSearch(this.props.location.search)
  };
  toggleInProgress = () => {
    this.setState({inProgress: !this.state.inProgress});
  };
  executeSearch = params =>  {
    axios
      .get(`http://localhost:8000/search/${params}`)
      .then(res => {res.data.results.forEach(r => this.fetchFromUri(r.uri, r.hit_count)); this.toggleInProgress();})
      .catch(err => console.log(err));
  };
  fetchFromUri = (uri, hit_count) => {
    axios
      .get(`http://localhost:8000${uri}`)
      .then(res => {res.data.hit_count = hit_count; this.setState({items: [...this.state.items, res.data]});})
      .catch(err => console.log(err));
  }
  parseParams = (params) => {
    return queryString.parse(params);
  }
  render() {
    // TODO: replace with search component
    // TODO: perform search without page reload
    return (
      <React.Fragment>
        <Helmet>
          <title>Search Results</title>
        </Helmet>
        <div className="container--full-width">
          <div className="search-bar">
            <Search className="search-form--results" />
          </div>
          <main id="main" role="main" className="search-results">
            <h1 className="search__title">{`Search Results ${this.state.query && `for “${this.state.query}”` }`}</h1>
            { this.state.inProgress ? (<p>Searching</p>) : (<TileList items={this.state.items} />)}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default PageSearch;
