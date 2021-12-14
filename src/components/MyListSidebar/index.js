import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '../MaterialIcon'
import Button from '../Button'

const MyListSidebar = ({ duplicationRequest, readingRoomRequest }) => (
  <aside className='mylist__sidebar'>
    <Button
      className='btn--gold btn--lg'
      label='Request in Reading Room'
      iconBefore='local_library'
      handleClick={() => readingRoomRequest()} />
    <Button
      className='btn--gold btn--lg'
      label='Request Copies'
      iconBefore='content_copy'
      handleClick={() => duplicationRequest()} />
  </aside>)

MyListSidebar.propTypes = {
  duplicationRequest: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired
}

export default MyListSidebar
