import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '../MaterialIcon'
import Button from '../Button'
import { Trans } from '@lingui/macro'

const MyListSidebar = ({ duplicationRequest, readingRoomRequest }) => (
  <aside className='mylist__sidebar'>
    <Trans comment='Schedule a visit button'>
      <a
        className='btn btn--orange btn--lg'
        href={t({
          comment: 'Scheduling an appointment email link',
          message: 'mailto:archive@rockarch.org?subject=Scheduling a research appointment'
        })}
        title='opens email'>
        <MaterialIcon icon='account_balance' /> Schedule a Visit
      </a>
    </Trans>
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
