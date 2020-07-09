import React, { Component } from "react";
import Badge from './Badge'
import PropTypes from 'prop-types';

class MatchCountBadge extends Component {
  render() {
    return (
      <a onClick={this.props.onClick}>
        <Badge label={this.props.label} className="match-count" />
      </a>
    )
  }
}

MatchCountBadge.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MatchCountBadge;
