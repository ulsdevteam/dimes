import React, { Component } from "react";
import { LiveMessage } from "react-aria-live";
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
      ancestors: {},
      isAncestorsLoading: true,
      isContentShown: false,
      isLoading: true,
      found: true,
      collection: { title: "" },
      activeRecords: { title: "" },
      params: {},
      updateMessage: ""
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
    this.setState({ updateMessage: `Details under heading 1 have been updated to describe the selected records titled ${records.title}`})
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
        <LiveMessage message={this.state.updateMessage} aria-live="polite" />
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
