import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import classnames from 'classnames'
import './styles.scss'

const ContextSwitcher = ({isContentShown, toggleIsContentShown}) => (
  <div className='toggle-wrapper'>
    <Button
      className={classnames('btn', 'btn--lg', 'btn--orange', 'toggle-context')}
      iconBefore={isContentShown ? 'west' : null}
      iconAfter={isContentShown ? null : 'east'}
      label={isContentShown ? 'Collection Details' : 'Collection Content'}
      handleClick={toggleIsContentShown} />
  </div>
)

ContextSwitcher.propTypes = {
  isContentShown: PropTypes.bool.isRequired,
  toggleIsContentShown: PropTypes.func.isRequired
}

export default ContextSwitcher
