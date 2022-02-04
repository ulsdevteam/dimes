import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const AgentAttribute = ({ label, value }) => (
  <div className={'agent-attribute'}>
    <p className='agent-attribute__label'>{label}</p>
    <p className='agent-attribute__value'>{value}</p>
  </div>)

const AgentAttributeList = ({ items }) => {
  const listItems = Object.keys(items).map((item, index) =>
    <AgentAttribute
      key={index}
      label={item}
      value={items[item]} />
  )
  return (
    <div className='agent__attributes'>
      {listItems}
    </div>
  )
}

AgentAttribute.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default AgentAttributeList
