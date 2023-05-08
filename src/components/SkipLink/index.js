import React from 'react'
import './styles.scss'
import { Trans } from '@lingui/macro'

const SkipLink = () => (
  <a href='#main' className='skip-link visually-hidden'>
    <Trans comment='Skip Link'>
      Skip to main content
    </Trans>
  </a>
)

export default SkipLink
