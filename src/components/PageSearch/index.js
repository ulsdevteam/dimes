import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Button from "../Button";
import { SelectInput, SelectOption } from "../Inputs"
import SearchForm from "../SearchForm";
import TileList from "../Tile";
import "./styles.scss"

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      query: "",
      pageSize: 50,
      startItem: 0,
      endItem: 0,
      resultsCount: 0,
      showFacets: false,
      sort: ""
    };
  };
  componentDidMount() {
    this.setState({inProgress: true})
    const params = this.parseParams(this.props.location.search)
    this.executeSearch(params)
  };
  toggleInProgress = () => {
    this.setState({inProgress: !this.state.inProgress});
  };
  startItem = (results, offset) => {
    var startItem = this.state.startItem;
    if (offset) startItem = offset;
    if (results.count) startItem = 1
    return startItem;
  }
  endItem = (results, offset) => {
    var endItem = results.count
    if (results.count > this.state.pageSize) endItem = this.state.pageSize;
    if (offset) endItem = offset + this.state.pageSize;
    return endItem;
  }
  pageSize = (results, limit) => {
    if (limit) {
      return limit
    } else if (results.next) {
      return this.parseParams(queryString.extract(results.next)).limit
    } else {
      return this.state.pageSize;
    }
  }
  executeSearch = params =>  {
    axios
      .get(`http://10.0.1.90:8010/search/?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({items: []})
        res.data.results.forEach(r => this.fetchFromUri(r.uri, r.hit_count));
        this.setState({sort: params.sort})
        this.setState({query: params.query})
        this.setState({pageSize: this.pageSize(res.data, params.limit)})
        this.setState({startItem: this.startItem(res.data, params.offset)})
        this.setState({endItem: this.endItem(res.data, params.offset)})
        this.setState({resultsCount: res.data.count})
        this.setState({inProgress: false})
      })
      .catch(err => console.log(err));
  };
  fetchFromUri = (uri, hit_count) => {
    axios
      .get(`http://10.0.1.90:8010${uri}`)
      .then(res => {res.data.hit_count = hit_count; this.setState({items: [...this.state.items, res.data]});})
      .catch(err => console.log(err));
  }
  handleSortChange = (event) => {
    var params = this.parseParams(this.props.location.search)
    event.target.value ? params.sort = event.target.value : delete params["sort"]
    this.props.history.push(`${window.location.pathname}?${queryString.stringify(params)}`)
    this.executeSearch(params);
  }
  parseParams = (params) => {
    return queryString.parse(params);
  }
  toggleFacets = () => {
    this.setState({showFacets: !this.state.showFacets});
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
              {`${this.state.startItem === this.state.endItem ?
                this.state.startItem :
                `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`}
            </p>
            <div className="search__controls">
              <Button
                onClick={this.toggleFacets}
                label="Filters"
                iconBefore="filter_alt"
                className="btn--filter" />
              <div className="select__sort--wrapper">
                <SelectInput
                  className="hide-label select__sort"
                  handleChange={this.handleSortChange}
                  id="sort"
                  label="Sort search results" >
                    <SelectOption value="" label="Sort by relevance" selectedValue={this.state.sort} />
                    <SelectOption value="title" label="Sort by title" selectedValue={this.state.sort} />
                    <SelectOption value="creator" label="Sort by creator name" selectedValue={this.state.sort} />
                </SelectInput>
              </div>
            </div>
            { this.state.inProgress ? (<p>Searching</p>) : (<TileList items={this.state.items} />)}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default PageSearch;
