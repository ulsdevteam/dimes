import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import {Helmet} from "react-helmet";
import SearchForm from "./SearchForm";
import TileList from "./Tile";

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      query: this.parseParams(this.props.location.search).query,
      pageSize: 100,
      startItem: 0,
      endItem: 0,
      resultsCount: 0,
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
  calculateStartItem = results => {
    var startItem = 0;
    const offset = this.parseParams(this.props.location.search).offset;
    if (offset) startItem = offset;
    if (results.count) startItem = 1
    return startItem;
  }
  calculateEndItem = results => {
    var endItem = results.count
    const offset = this.parseParams(this.props.location.search).offset;
    if (offset) endItem = offset + this.state.pageSize;
    return endItem;
  }
  executeSearch = params =>  {
    axios
      .get(`http://localhost:8000/search/${params}`)
      .then(res => {
        res.data.results.forEach(r => this.fetchFromUri(r.uri, r.hit_count));
        this.setState({startItem: this.calculateStartItem(res.data)})
        this.setState({endItem: this.calculateEndItem(res.data)})
        this.setState({resultsCount: res.data.count})
        this.toggleInProgress();
      })
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
            <SearchForm className="search-form--results" />
          </div>
          <main id="main" role="main" className="search-results">
            <h1 className="search__title">{`Search Results ${this.state.query && `for “${this.state.query}”` }`}</h1>
            <p className="results__summary">
              {`${this.state.startItem === this.state.endItem ? this.state.startItem : `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`}
            </p>
            { this.state.inProgress ? (<p>Searching</p>) : (<TileList items={this.state.items} />)}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default PageSearch;
