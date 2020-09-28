import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import "./styles.scss"


const ContextSwitcher = ({isContextShown, toggleIsContextShown}) => {
  return (
  <div className="toggle-wrapper">
    <Button
      className={`toggle-context ${isContextShown? null : "toggle-context--active"}`}
      iconBefore={isContextShown ? "west" : null}
      label="Collection Details"
      handleClick={toggleIsContextShown} />
    <Button
      className={`toggle-context ${isContextShown ? "toggle-context--active" : ""}`}
      label="Collection Content"
      iconAfter={isContextShown ? null : "east"}
      handleClick={toggleIsContextShown} />
  </div>
)}

ContextSwitcher.propTypes = {
  isContextShown: PropTypes.bool.isRequired,
  toggleIsContextShown: PropTypes.func.isRequired,
}

export default ContextSwitcher
