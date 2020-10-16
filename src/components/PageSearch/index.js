import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import Skeleton from 'react-loading-skeleton';
import { Helmet } from "react-helmet";
import Button from "../Button";
import { SelectInput, SelectOption } from "../Inputs"
import { SearchSkeleton } from "../LoadingSkeleton";
import { CollectionHitsModal, FacetModal } from "../ModalSearch";
import { SearchPagination } from "../Pagination";
import SearchForm from "../SearchForm";
import TileList from "../Tile";
import "./styles.scss"

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      offset: 0,
      params: {query: "", category: ""},
      pageCount: 0,
      pageSize: 40,
      startItem: 0,
      endItem: 0,
      resultsCount: 0,
      hitsChildren: [],
      hitsChildrenIsLoading: false,
      hitsCollection: {},
      hitsCollectionIsLoading: false,
      hitsIsOpen: false,
      facetIsOpen: false,
      facetData: {},
    };
  };

  componentDidMount() {
    let params = queryString.parse(this.props.location.search)
    params.limit = this.state.pageSize
    this.executeSearch(params)
  };

  startItem = (results, offset) => {
    var startItem = this.state.startItem;
    if (results.count) startItem = 1;
    if (offset > 0) startItem = offset;
    return startItem;
  }

  endItem = (results, offset) => {
    var endItem = results.count
    if (results.count > this.state.pageSize) endItem = this.state.pageSize;
    if (offset) endItem = Math.ceil(Number(offset) + Number(this.state.pageSize));
    if (endItem > results.count) endItem = results.count
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
        this.setState({offset: params.offset})
        this.setState({pageCount: Math.ceil(res.data.count / this.state.pageSize)})
        this.setState({inProgress: false});
        this.excecuteFacetsSearch(params);
      })
      .catch(err => console.log(err));
  };

  handleDateFacetChange = (startYear, endYear) => {
    var params = {...this.state.params}
    params.start_date__gte = startYear
    params.end_date__lte = endYear
    delete params.offset
    this.executeSearch(params);
  }

  getChildrenPage = uri => {
    axios
      .get(uri)
      .then(res => {
        this.setState({ hitsChildren: [...this.state.hitsChildren].concat(res.data.results) })
        this.state.hitsChildrenIsLoading && this.setState({ hitsChildrenIsLoading: false })
        res.data.next && this.getChildrenPage(res.data.next)
      })
      .catch(err => console.log(err))
  }

  handleHitCountClick = uri => {
    this.setState({ hitsChildrenIsLoading: true, hitsCollectionIsLoading: true, hitsChildren: []}, () => this.toggleHitsModal())
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}${uri}/?${queryString.stringify(this.state.params)}`)
      .then(res => {
        this.setState({ hitsCollection: res.data })
        this.setState({ hitsCollectionIsLoading: false })
      })
      .catch(err => console.log(err))
    const filteredParams = {...this.state.params, limit: 5}
    this.getChildrenPage(`${process.env.REACT_APP_ARGO_BASEURL}${uri}/children/?limit=5&${queryString.stringify(filteredParams)}`)
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
    delete params.offset
    this.executeSearch(params);
  }

  handlePageClick = (data) => {
    let offset = Math.ceil(data.selected * this.state.pageSize);
    let params = {...this.state.params}
    if (offset > 0) {params.offset = offset} else {delete params.offset}
    this.executeSearch(params)
  };

  handleSortChange = (event) => {
    var params = {...this.state.params}
    event.target.value ? params.sort = event.target.value : delete params["sort"]
    delete params.offset
    this.executeSearch(params);
  }

  toggleFacetModal = () => {
    this.setState({ facetIsOpen: !this.state.facetIsOpen })
  }

  toggleHitsModal = () => {
    this.setState({ hitsIsOpen: !this.state.hitsIsOpen })
    this.setState({ hitsData: {} })
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
          <div className="results">
            <h1 className="results__title">{`Search Results ${this.state.params.query && `for “${this.state.params.query}”` }`}</h1>
            <div className="results__header">
              <div className="results__summary">
                <p className="results__summary--text">
                {this.state.inProgress ? (<Skeleton />) : (`${this.state.startItem === this.state.endItem ?
                  this.state.startItem :
                  `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`)}
                </p>
              </div>
              <div className="results__controls">
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
              <div className="results__pagination">
                {this.state.inProgress ?
                  (<Skeleton />) :
                  (<SearchPagination
                    offset={this.state.offset}
                    pageSize={this.state.pageSize}
                    pageCount={this.state.pageCount}
                    handlePageClick={this.handlePageClick}
                  />)}
              </div>
            </div>
            { this.state.inProgress ?
              (<SearchSkeleton />) :
              (<TileList
                items={this.state.items}
                handleHitCountClick={this.handleHitCountClick}
                params={this.state.params} />)}
              <div className="results__footer">
                <p className="results__summary">
                  {`${this.state.startItem === this.state.endItem ?
                    this.state.startItem :
                    `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`}
                </p>
                <div className="results__pagination">
                  <SearchPagination
                    offset={this.state.offset}
                    pageSize={this.state.pageSize}
                    pageCount={this.state.pageCount}
                    handlePageClick={this.handlePageClick}
                  />
              </div>
            </div>
          </div>
        </div>
        <FacetModal
          isOpen={this.state.facetIsOpen}
          toggleModal={this.toggleFacetModal}
          data={this.state.facetData}
          params={this.state.params}
          handleChange={this.handleFacetChange}
          handleDateChange={this.handleDateFacetChange} />
        <CollectionHitsModal
          children={this.state.hitsChildren}
          collection={this.state.hitsCollection}
          isCollectionLoading={this.state.hitsCollectionIsLoading}
          isChildrenLoading={this.state.hitsChildrenIsLoading}
          isOpen={this.state.hitsIsOpen}
          params={this.state.params}
          toggleModal={this.toggleHitsModal} />
      </React.Fragment>
    )
  }
}

export default PageSearch;
