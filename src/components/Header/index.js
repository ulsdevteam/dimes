import React from 'react'
import {Nav, NavItem} from '../Nav'

const Header = ({ myListCount }) => (
  <header className='header header--blue'>
    <div className='wrapper'>
      <div className='header__brand header__brand--text'>
        <a href='/' id='home' className='header__brand-title'>dimes.rockarch.org</a>
        <p className='header__brand-subtitle'>The Online Collection and Catalog of Rockefeller Archive Center</p>
      </div>
      <Nav ariaLabel='Main'>
        <NavItem href='https://raccess.rockarch.org/' id='raccess' label='Sign in to RACcess' icon='arrow_right_alt' />
        <NavItem href='/list/' id='list' label={`My List${myListCount > 0 ? ` (${myListCount})` : ''}`} icon='arrow_right_alt' />
      </Nav>
    </div>
  </header>)

export default Header
