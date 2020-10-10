import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ContextSwitcher from "../ContextSwitcher";
import RecordsContent from "../RecordsContent";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";


class PageRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRecords: {},
      ancestors: {},
      collection: {children: []},
      found: true,
      isAncestorsLoading: true,
      isContentShown: false,
      isLoading: true,
      params: {}
    }
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ params: params })
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({ collection: res.data })
        this.setState({ activeRecords: res.data });
        this.setState({ isLoading: false });
        const childrenParams = {...params, limit: 5}
        this.getChildrenPage(
          `${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}/children/?${queryString.stringify(childrenParams)}`,
          true
        )
      })
      .catch(err => this.setState({ found: false }));
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}/ancestors`)
      .then(res => {
        this.setState({ ancestors: res.data });
        this.setState({ isAncestorsLoading: false });
      })
      .catch(err => this.setState({ found: false }));
  };

  getChildrenPage = (uri, reset) => {
    axios
      .get(uri)
      .then(res => {
        // TODO: Once children have been removed as a field from Collections, this if statement will
        // no longer be necessary, and we can just use the else logic.
        if (reset) {
          this.setState(
            {collection: {...this.state.collection, children: res.data.results}},
            res.data.next && this.getChildrenPage(res.data.next))
        } else {
          this.setState(
            {collection: {...this.state.collection, children: [...this.state.collection.children].concat(res.data.results)}},
            res.data.next && this.getChildrenPage(res.data.next)
          )
        }
      })
      .catch(err => console.log(err))
  }

  setActiveRecords = records => {
    this.setState({ activeRecords: records })
  }

  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render() {
    const { savedList, toggleInList } = this.props;
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{ this.state.activeRecords.title }</title>
        </Helmet>
        <div className="container--full-width">
          <ContextSwitcher
            isContentShown={this.state.isContentShown}
            toggleIsContentShown={this.toggleIsContentShown} />
          <RecordsDetail
            activeRecords={this.state.activeRecords}
            ancestors={this.state.ancestors}
            isAncestorsLoading={this.state.isAncestorsLoading}
            isContentShown={this.state.isContentShown}
            isLoading={this.state.isLoading}
            params={this.state.params}
            savedList={savedList}
            toggleInList={toggleInList} />
          <RecordsContent
            isContentShown={this.state.isContentShown}
            params={this.state.params}
            parent={this.state.collection}
            savedList={savedList}
            setActiveRecords={this.setActiveRecords}
            toggleInList={toggleInList}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

PageRecords.propTypes = {
  savedList: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;
