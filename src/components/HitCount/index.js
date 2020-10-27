import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.scss";


export const HitCountButton = ({ className, handleClick, hitCount }) => (
  <button className={classnames("hit-count", className)} onClick={handleClick}>{hitCount === 10000 ? `${hitCount}+` : hitCount} matches</button>
)

HitCountButton.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}

export const HitCountBadge = ({ className, handleClick, hitCount }) => (
  <span className={classnames("hit-count", className)} onClick={handleClick}>{hitCount === 10000 ? `${hitCount}+` : hitCount} matches</span>
)

HitCountBadge.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}
