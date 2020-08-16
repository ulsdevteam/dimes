import React, { Component } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import Button from "./Button";
import {TextInput} from "./Inputs";
import TileList from "./Tile";

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: false,
      items: [],
      query: ""
    };
  };
  componentDidMount() {
    this.toggleInProgress()
    // TODO: parse query
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
  render() {
    // TODO: replace with search component
    // TODO: perform search without page reload
    return (
      <div>
        <Helmet>
          <title>Search Results</title>
        </Helmet>
        <div className="container search">
          <main id="main" role="main">
            <h1 className="search__title">Search Results</h1>
            <form role="search" action="/search" method="get">
                <div className="search search--results">
                  <div className="input-group__search">
                    <TextInput
                        className="label-hidden input__search"
                        label="Enter a search term"
                        id="query"
                        size="60"
                        type="search"
                    />
                    <Button
                        className="btn--block btn--search"
                        type="submit"
                        aria-label="Submit search"
                        iconBefore="search"
                    />
                </div>
              </div>
            </form>
            { this.state.inProgress ? (<p>Searching</p>) : (<TileList items={this.state.items} />)}
          </main>
        </div>
      </div>
    )
  }
}

export default PageSearch;
