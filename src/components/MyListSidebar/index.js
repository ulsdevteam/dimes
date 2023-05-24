import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '../MaterialIcon'
import Button from '../Button'

const MyListSidebar = ({ duplicationRequest, readingRoomRequest }) => (
  <aside className='mylist__sidebar py-60 pr-0 pl-40 mr--15'>
    <a
      className='btn btn--orange btn--lg'
      href='mailto:archive@rockarch.org?subject=Scheduling a research appointment'
      title='opens email'>
      <MaterialIcon icon='account_balance' className='material-icon--space-after' /> Schedule a Visit
    </a>
    <Button
      className='btn--orange btn--lg'
      label='Request in Reading Room'
      iconBefore='local_library'
      handleClick={() => readingRoomRequest()} />
    <Button
      className='btn--orange btn--lg'
      label='Request Copies'
      iconBefore='content_copy'
      handleClick={() => duplicationRequest()} />
  </aside>)

MyListSidebar.propTypes = {
  duplicationRequest: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired
}

export default MyListSidebar
