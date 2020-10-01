import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import "./styles.scss"


const ContextSwitcher = ({isContentShown, toggleIsContentShown}) => {
  return (
  <div className="toggle-wrapper">
    <Button
      className={`toggle-context ${isContentShown? null : "toggle-context--active"}`}
      iconBefore={isContentShown ? "west" : null}
      label="Collection Details"
      handleClick={toggleIsContentShown} />
    <Button
      className={`toggle-context ${isContentShown ? "toggle-context--active" : ""}`}
      label="Collection Content"
      iconAfter={isContentShown ? null : "east"}
      handleClick={toggleIsContentShown} />
  </div>
)}

ContextSwitcher.propTypes = {
  isContentShown: PropTypes.bool.isRequired,
  toggleIsContentShown: PropTypes.func.isRequired,
}

export default ContextSwitcher
