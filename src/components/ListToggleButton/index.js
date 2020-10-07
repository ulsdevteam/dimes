import React from "react"
import PropTypes from "prop-types";
import Button from "../Button";

const ListToggleButton = ({ className, isSaved, item, toggleSaved }) => (
  isSaved ? (
    <Button
      className={`${className} saved`}
      label="Remove from List"
      iconAfter="remove_circle_outline"
      handleClick={() => toggleSaved(item)} />
  ) : (
    <Button
      className={className}
      label="Add to List"
      iconAfter="add_circle_outline"
      handleClick={() => toggleSaved(item)} />
  )
)

ListToggleButton.propTypes = {
  className: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  toggleSaved: PropTypes.func.isRequired
}

export default ListToggleButton;
