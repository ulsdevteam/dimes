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
      params: this.parseParams(this.props.location.search),
      pageSize: 40,
      startItem: 0,
      endItem: 0,
      resultsCount: 0,
      facetIsOpen: false,
      facetData: {},
    };
  };
  componentDidMount() {
    this.executeSearch(this.state.params)
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
  excecuteFacetsSearch = params =>  {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/facets/?${queryString.stringify(params)}`)
      .then(res => {this.setState({ facetData: res.data})})
      .catch(err => console.log(err));
  };
  executeSearch = params =>  {
    this.props.history.push(`${window.location.pathname}?${queryString.stringify(params)}`)
    this.setState({ inProgress: true });
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search/?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({items: res.data.results})
        this.setState({startItem: this.startItem(res.data, params.offset)})
        this.setState({endItem: this.endItem(res.data, params.offset)})
        this.setState({resultsCount: res.data.count})
        this.setState({inProgress: false});
        this.excecuteFacetsSearch(params);
      })
      .catch(err => console.log(err));
  };
  handleDateFacetChange = (startYear, endYear) => {
    var params = {...this.state.params}
    params.start_date__gte = startYear
    params.end_date__lte = endYear
    this.executeSearch(params);
  }
  /** Pushes changes to facet checkboxes to url and executes search */
  handleFacetChange = (event, k) => {
    var params = {...this.state.params}
    if (event.target.checked) {
      if (Array.isArray(params[k])) {
        params[k].push(event.target.name)
      } else if (params[k]) {
        params[k] = [params[k], event.target.name]
      } else {
        params[k] = event.target.name;
      }
    } else {
      Array.isArray(params[k]) ? delete params[k][params[k].indexOf(event.target.name)] : delete params[k]
    }
    this.executeSearch(params);
  }
  handleSortChange = (event) => {
    var params = {...this.state.params}
    event.target.value ? params.sort = event.target.value : delete params["sort"]
    this.executeSearch(params);
  }
  parseParams = (params) => {
    return queryString.parse(params);
  }
  toggleFacetModal = () => {
    this.setState({ facetIsOpen: !this.state.facetIsOpen })
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Search Results</title>
        </Helmet>
        <div className="container--full-width">
          <div className="search-bar">
            <SearchForm
              className="search-form--results"
              query={this.state.params.query}
              category={this.state.params.category}
             />
          </div>
          <div className="search-results">
            <h1 className="search__title">{`Search Results ${this.state.params.query && `for “${this.state.params.query}”` }`}</h1>
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
                  defaultValue={this.state.params.sort} >
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
          data={this.state.facetData}
          params={this.state.params}
          handleChange={this.handleFacetChange}
          handleDateChange={this.handleDateFacetChange} />
      </React.Fragment>
    )
  }
}

export default PageSearch;
