import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import classnames from "classnames";
import "./styles.scss"


const ContextSwitcher = ({isContentShown, toggleIsContentShown}) => {
  return (
  <div className="toggle-wrapper">
    <Button
      className={classnames("toggle-context", {"toggle-context--active": !isContentShown})}
      iconBefore={isContentShown ? "west" : null}
      label="Collection Details"
      handleClick={toggleIsContentShown} />
    <Button
      className={classnames("toggle-context", {"toggle-context--active": isContentShown})}
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
