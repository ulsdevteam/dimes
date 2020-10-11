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
      item: {},
      ancestors: {},
      children: [],
      found: true,
      isAncestorsLoading: true,
      isChildrenLoading: true,
      isContentShown: false,
      isItemLoading: true,
      params: {}
    }
  }

  componentDidMount() {
    const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}`
    const params = queryString.parse(this.props.location.search);
    const childrenParams = {...params, limit: 5}
    this.setState({ params: params })
    axios
      .get(`${itemUrl}?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({ item: res.data });
        this.setState({ isItemLoading: false });
      })
      .catch(err => this.setState({ found: false }));
    axios
      .get(`${itemUrl}/ancestors`)
      .then(res => {
        this.setState({ ancestors: res.data });
        this.setState({ isAncestorsLoading: false });
      })
      .catch(err => this.setState({ found: false }));
    this.getPage(`${itemUrl}/children/?${queryString.stringify(childrenParams)}`)
  };

  getPage = uri => {
    axios
      .get(uri)
      .then(res => {
          this.setState({ children: [...this.state.children].concat(res.data.results)});
          this.state.isChildrenLoading && this.setState({ isChildrenLoading: false });
          res.data.next && this.getPage(res.data.next)
        }
      )
      .catch(err => console.log(err))
  }

  setActiveRecords = uri => {
    this.setState({isItemLoading: true})
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${uri}?${queryString.stringify(this.state.params)}`)
      .then(res => {
        this.setState({ item: res.data })
      })
      .catch(e => console.log(e))
      .then(() => this.setState({isItemLoading: false}));
  }

  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  render() {
    const { savedList, toggleInList } = this.props;
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{ this.state.item.title }</title>
        </Helmet>
        <div className="container--full-width">
          <ContextSwitcher
            isContentShown={this.state.isContentShown}
            toggleIsContentShown={this.toggleIsContentShown} />
          <RecordsDetail
            ancestors={this.state.ancestors}
            isAncestorsLoading={this.state.isAncestorsLoading}
            isContentShown={this.state.isContentShown}
            isItemLoading={this.state.isItemLoading}
            item={this.state.item}
            params={this.state.params}
            savedList={savedList}
            toggleInList={toggleInList} />
          <RecordsContent
            children={this.state.children}
            collection={this.state.ancestors.length ? this.state.ancestors.slice(0)[0] : this.state.item}
            isContentShown={this.state.isContentShown}
            params={this.state.params}
            parent={this.state.item}
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
