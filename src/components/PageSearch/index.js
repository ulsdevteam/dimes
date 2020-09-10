import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Button from "../Button";
import { SelectInput, SelectOption } from "../Inputs"
import { FacetModal } from "../Modal";
import SearchForm from "../SearchForm";
import TileList from "../Tile";
import "./styles.scss"

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      query: this.parseParams(this.props.location.search).query,
      category: this.parseParams(this.props.location.search).category,
      pageSize: 50,
      startItem: 0,
      endItem: 0,
      resultsCount: 0,
      facetIsOpen: false,
      facetData: [],
      sort: ""
    };
  };
  componentDidMount() {
    const params = this.parseParams(this.props.location.search)
    this.executeSearch(params)
    this.excecuteFacetsSearch(this.props.location.search)
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
  excecuteFacetsSearch = params =>  {
    axios
      .get(`http://10.0.1.90:8010/facets/${params}`)
      .then(res => {this.setState({ facetData: res.data})})
      .catch(err => console.log(err));
  };
  executeSearch = params =>  {
    this.setState({inProgress: true});
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
        this.setState({inProgress: false});
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
  toggleFacetModal = () => {
    this.setState({ facetIsOpen: !this.state.facetIsOpen })
  }
  render() {
    // TODO: perform search without page reload
    return (
      <React.Fragment>
        <Helmet>
          <title>Search Results</title>
        </Helmet>
        <div className="container--full-width">
          <div className="search-bar">
            <SearchForm className="search-form--results" query={this.state.query} category={this.state.category} />
          </div>
          <div className="search-results">
            <h1 className="search__title">{`Search Results ${this.state.query && `for “${this.state.query}”` }`}</h1>
            <p className="results__summary">
              {`${this.state.startItem === this.state.endItem ?
                this.state.startItem :
                `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`}
            </p>
            <div className="search__controls">
              <Button
                handleClick={() => this.toggleFacetModal()}
                label="Filters"
                iconBefore="filter_alt"
                className="btn--filter" />
              <div className="select__sort--wrapper">
                <SelectInput
                  className="hide-label select__sort"
                  handleChange={this.handleSortChange}
                  id="sort"
                  label="Sort search results"
                  defaultValue={this.state.sort} >
                    <SelectOption value="" label="Sort by relevance" />
                    <SelectOption value="title" label="Sort by title" />
                    <SelectOption value="creator" label="Sort by creator name" />
                </SelectInput>
              </div>
            </div>
            { this.state.inProgress ? (<p>Searching</p>) : (<TileList items={this.state.items} />)}
          </div>
        </div>
        <FacetModal
          isOpen={this.state.facetIsOpen}
          toggleModal={this.toggleFacetModal}
          data={this.state.facetData} />
      </React.Fragment>
    )
  }
}

export default PageSearch;
