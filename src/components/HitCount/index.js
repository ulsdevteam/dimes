import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";


const HitCount = ({ className, handleClick, hitCount }) => (
  <button className={`hit-count ${className}`} onClick={handleClick}>{hitCount} matches</button>
)

HitCount.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func,
  hitCount: PropTypes.number.isRequired,
}

export default HitCount;
