import React, { Component } from "react";
import PropTypes from 'prop-types';

class SkipLink extends Component {
  render() {
    return (
      <a
        className={this.props.className}
        href={this.props.contentAnchor}>
          Skip to main content
      </a>
    )
  }
}

SkipLink.propTypes = {
  contentAnchor: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default SkipLink;
