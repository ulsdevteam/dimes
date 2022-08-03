import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import { firePageViewEvent } from '../Helpers'
import './styles.scss'

const PageBackendError = ({error}) => (
  <>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>Page Not Found</title>
    </Helmet>
    <div className='backend-error'>
      <span className='not-found__icon'><MaterialIcon icon='error_outline' /></span>
      <h1 className='backend-error__title'>There was an error fetching data.</h1>
      <p className='backend-error__text'>The request to {error.config.url} failed.</p>
      <p className='backend-error__text'>The error message was {error.code}: {error.message}</p>
      {error.request.data ? <p className='backend-error__text'>Request data: ${error.request.data}</p> : null}
      <p className='backend-error__text'>To report this problem, send us an email at <a href='mailto:archive.rockarch.org'>archive.rockarch.org</a>.</p>
    </div>
  </>
)

PageBackendError.propTypes = {
  error: PropTypes.object
}

export default PageBackendError
