import React from 'react'
import logo from '../../assets/homepage_logo.png'
import { Trans } from '@lingui/macro'
import './styles.scss'

const Hero = () => (
  <div className='hero'>
    <div className='hero__logo'>
      <img aria-hidden='true' alt='' src={logo} />
    </div>
    <h1 className='hero__text'>
      <Trans comment='Message shown within the Hero'>
        Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content.
      </Trans>
    </h1>
  </div>)

export default Hero
