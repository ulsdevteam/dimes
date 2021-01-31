import React from "react"
import PropTypes from "prop-types";
import Button from "../Button";
import classnames from "classnames";

const ListToggleButton = ({ className, isMobile, isSaved, item, toggleSaved }) => (
  isSaved ? (
    <Button
      ariaLabel="Remove item from list"
      ariaPressed={true}
      className={classnames("saved", className)}
      label={isMobile ? "Remove" : "Remove from List"}
      iconAfter="remove_circle_outline"
      handleClick={() => toggleSaved(item)} />
  ) : (
    <Button
      ariaLabel="Add item to list"
      ariaPressed={false}
      className={className}
      label={isMobile? "Add" : "Add to List"}
      iconAfter="add_circle_outline"
      handleClick={() => toggleSaved(item)} />
  )
)

ListToggleButton.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  isSaved: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  toggleSaved: PropTypes.func.isRequired
}

export default ListToggleButton;
