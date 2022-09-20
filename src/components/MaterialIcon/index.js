import React from 'react'
import PropTypes from 'prop-types'
import {ReactComponent as ArchiveBox} from './assets/archive_box.svg'

const MaterialIcon = ({ icon }) => {
  if (icon === 'archive_box') {
    return <span aria-hidden='true'><ArchiveBox /></span>
  } else {
    return <span className='material-icon' aria-hidden='true'>{icon}</span>
  }
}

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default MaterialIcon
