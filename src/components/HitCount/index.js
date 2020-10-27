import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.scss";


const HitCount = ({ className, handleClick, hitCount }) => (
  <button className={classnames("hit-count", className)} onClick={handleClick}>{hitCount} matches</button>
)

HitCount.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}

export default HitCount;
