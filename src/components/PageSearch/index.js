import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import queryString from 'query-string'
import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'
import Button from '../Button'
import { SelectInput } from '../Inputs'
import { SearchSkeleton } from '../LoadingSkeleton'
import { FacetModal } from '../ModalSearch'
import { SearchPagination } from '../Pagination'
import SearchForm from '../SearchForm'
import SearchNotFound from '../SearchNotFound'
import TileList from '../Tile'
import { appendParams, firePageViewEvent } from '../Helpers'
import './styles.scss'

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
      facetIsOpen: false,
      facetData: {},
      suggestions: []
    };
  };

  /** Execute search based on params */
  componentDidMount() {
    let params = queryString.parse(this.props.location.search, {parseBooleans: true})
    params.limit = this.state.pageSize
    this.executeSearch(params)
  };

  /** Get first search result */
  startItem = (results, offset) => {
    var startItem = this.state.startItem;
    if (results.count) startItem = 1;
    if (offset > 0) startItem = offset;
    return startItem;
  }

  /** Get last search result */
  endItem = (results, offset) => {
    var endItem = results.count
    if (results.count > this.state.pageSize) endItem = this.state.pageSize;
    if (offset) endItem = Math.ceil(Number(offset) + Number(this.state.pageSize));
    if (endItem > results.count) endItem = results.count
    return endItem;
  }

  /** Fetch data from facets endpoint */
  excecuteFacetsSearch = params =>  {
    axios
      .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}/facets/`, params))
      .then(res => {this.setState({ facetData: res.data})})
      .catch(err => console.log(err));
  };

  executeSuggestSearch = params => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search/suggest/?title_suggest=${params.query}`)
      .then(res => {
        const suggestions = res.data.title_suggest.reduce((a, c) => {
          const options = c.options.map(o => o.text)
          return (a.concat(options))
        }, [])
        this.setState({ suggestions: suggestions})
      })
      .catch(err => console.log(err))
  }

  /** Executes search and sets results in state */
  executeSearch = params =>  {
    this.props.history.push(appendParams(window.location.pathname, params))
    this.setState({ inProgress: true });
    this.setState({ params: params })
    axios
      .get(appendParams(`${process.env.REACT_APP_ARGO_BASEURL}/search/`, params))
      .then(res => {
        this.setState({items: res.data.results})
        this.setState({startItem: this.startItem(res.data, params.offset)})
        this.setState({endItem: this.endItem(res.data, params.offset)})
        this.setState({resultsCount: res.data.count})
        this.setState({offset: params.offset})
        this.setState({pageCount: Math.ceil(res.data.count / this.state.pageSize)})
        this.excecuteFacetsSearch(params);
        !res.data.count && this.executeSuggestSearch(params)
        this.setState({inProgress: false});
      })
      .catch(err => console.log(err));
  };

  /** Executes search when user clicks on Apply button in date facet */
  handleDateFacetChange = (startYear, endYear) => {
    var params = {...this.state.params}
    params.start_date__gte = startYear
    params.end_date__lte = endYear
    delete params.offset
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
    delete params.offset
    this.executeSearch(params);
  }

  /** Sets online flag when chechbox is checked **/
  handleOnlineChange = (event) => {
    var params = { ...this.state.params, online: event.target.checked }
    this.executeSearch(params)
  }

  /** Sets offset and executes search based on user input */
  handlePageClick = (data) => {
    let offset = Math.ceil(data.selected * this.state.pageSize);
    let params = {...this.state.params}
    if (offset > 0) {params.offset = offset} else {delete params.offset}
    this.executeSearch(params)
  };

  /** Changes sort based on user input */
  handleSortChange = value => {
    var params = {...this.state.params}
    value ? params.sort = value : delete params['sort']
    delete params.offset
    this.executeSearch(params)
  }

  /** Shows and hides the facet modal */
  toggleFacetModal = () => {
    this.setState({ facetIsOpen: !this.state.facetIsOpen })
  }

  sortOptions = [
    {value: '', label: 'Sort by relevance'},
    {value: 'title', label: 'Sort by title'},
    {value: 'creator', label: 'Sort by creator name'}
  ]

  render() {
    return (
      <React.Fragment>
        <Helmet
          onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
          <title>Search Results</title>
        </Helmet>
        <div className='container--full-width'>
          <div className='search-bar'>
            <SearchForm
              className='search-form--results'
              handleOnlineChange={this.handleOnlineChange}
              query={this.state.params.query}
              online={this.state.params.online}
              category={this.state.params.category} />
          </div>
          <div className='results'>
          <h1 className={classnames('results__title', { 'loading-dots': this.state.inProgress })}>{this.state.inProgress ? "Searching" :
            (this.state.resultsCount ?
              (`Search Results ${this.state.params.query && `for “${this.state.params.query.replace(/"([^"]+(?="))"/g, '$1')}”`}`) :
              (`Sorry, there are no search results ${this.state.params.query && `for “${this.state.params.query.replace(/"([^"]+(?="))"/g, '$1')}”`}`))
          }
          </h1>
            {!this.state.resultsCount && !this.state.inProgress ?
              (
                <SearchNotFound suggestions={this.state.suggestions}/>
              ) :
              (<>
                <div className='results__header'>
                  <div className='results__summary'>
                    <p className='results__summary--text'>
                      {this.state.inProgress ? (<Skeleton />) : (`${this.state.startItem === this.state.endItem ?
                          this.state.startItem :
                          `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`)}
                    </p>
                  </div>
                  <div className='results__controls'>
                    <Button
                      handleClick={() => this.toggleFacetModal()}
                      label='Filters'
                      iconBefore='filter_alt'
                      className='btn--filter' />
                    <SelectInput
                      className='select__sort'
                      hideLabel
                      id='sort'
                      name='sort'
                      onChange={({selectedItem}) => this.handleSortChange(selectedItem.value)}
                      label='Sort search results'
                      selectedItem={this.state.params.sort || ''}
                      options={this.sortOptions} />
                  </div>
                  <div className='results__pagination'>
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
                      params={this.state.params} />)}
                <div className='results__footer'>
                  <p className='results__summary'>
                    {`${this.state.startItem === this.state.endItem ?
                            this.state.startItem :
                            `${this.state.startItem}-${this.state.endItem}`} of ${this.state.resultsCount} results`}
                  </p>
                  <div className='results__pagination'>
                    <SearchPagination
                      offset={this.state.offset}
                      pageSize={this.state.pageSize}
                      pageCount={this.state.pageCount}
                      handlePageClick={this.handlePageClick}
                            />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <FacetModal
          isOpen={this.state.facetIsOpen}
          toggleModal={this.toggleFacetModal}
          data={this.state.facetData}
          params={this.state.params}
          resultsCount={this.state.resultsCount}
          handleChange={this.handleFacetChange}
          handleDateChange={this.handleDateFacetChange} />
      </React.Fragment>

    )
  }
}

export default PageSearch;
