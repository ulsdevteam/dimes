import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const MaterialIcon = ({ icon }) => (
  <span className="material-icons" aria-hidden="true">{icon}</span>
)

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default MaterialIcon
