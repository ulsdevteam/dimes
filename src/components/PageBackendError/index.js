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
      <p className='backend-error__text'>To report this problem, send us an email at <a href='mailto:archives-ref@mail.pitt.edu'>archives-ref@mail.pitt.edu</a>.</p>
      <p className='backend-error__header'>Error message:</p>
      <p className='backend-error__message'>{error.code}: {error.message}</p>
      {error.response.data ? <p className='backend-error__message'>{JSON.stringify(error.response.data)}</p> : null}
      {error.config.data ?
        <>
          <p className='backend-error__header'>Request data:</p>
          <p className='backend-error__message'>{error.config.data}</p>
        </> : null}
    </div>
  </>
)

PageBackendError.propTypes = {
  error: PropTypes.object
}

export default PageBackendError
