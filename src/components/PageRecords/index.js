import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ContextSwitcher from "../ContextSwitcher";
import RecordsContent from "../RecordsContent";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";


class PageCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ancestors: {},
      isAncestorsLoading: true,
      isContentShown: false,
      isLoading: true,
      found: true,
      collection: { title: "" },
      activeRecords: { title: "" },
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
            isContentShown={this.state.isContentShown}
            isLoading={this.state.isLoading}
            isAncestorsLoading={this.state.isAncestorsLoading}
            params={this.state.params}
            records={this.state.records} />
          <RecordsContent
            isContentShown={this.state.isContentShown}
            isLoading={this.state.isLoading}
            params={this.state.params}
            parent={this.state.collection}
            setActiveRecords={this.setActiveRecords}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageCollection;
