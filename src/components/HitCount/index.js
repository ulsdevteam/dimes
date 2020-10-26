import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";


export const HitCountButton = ({ className, handleClick, hitCount }) => (
  <button className={`hit-count ${className}`} onClick={handleClick}>{hitCount} matches</button>
)

HitCountButton.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}

export const HitCountBadge = ({ className, handleClick, hitCount }) => (
  <span className={`hit-count ${className}`} onClick={handleClick}>{hitCount} matches</span>
)

HitCountBadge.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}
