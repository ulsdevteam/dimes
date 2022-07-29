import React from 'react'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import { firePageViewEvent } from '../Helpers'
import './styles.scss'

const PageNotFound = () => (
  <>
    <Helmet
      onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
      <title>Page Not Found</title>
    </Helmet>
    <div className='not-found'>
      <span className='not-found__icon'><MaterialIcon icon='help_outline' /></span>
      <h1 className='not-found__header'>Sorry, the requested page was not found!</h1>
    </div>
  </>
)

export default PageNotFound;
