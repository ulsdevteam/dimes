import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.scss";

const AgentAttribute = ({ label, note, value }) => (
  <div className={classnames("agent-attribute", {"agent-attribute--full-width": note})}>
    <p className="agent-attribute__label">{label}</p>
    <p className="agent-attribute__value">{value}</p>
  </div>)

const AgentAttributeList = ({ items }) => {
  const listItems = items.map((item, index) =>
    <AgentAttribute
      key={index}
      label={item.label}
      value={item.value}
      note={item.note} />
  );
  return (
    <div className="agent__attributes">
      {listItems}
    </div>
  )
}

AgentAttribute.propTypes = {
  label: PropTypes.string.isRequired,
  note: PropTypes.bool,
  value: PropTypes.string.isRequired
}

export default AgentAttributeList;
