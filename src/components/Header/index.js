import React from 'react'
import {Nav, NavItem} from '../Nav'
import './styles.scss'

const Header = ({ myListCount }) => (
  <header className='header-secondary'>
    <div className='wrapper'>
      <div className='container'>
        <div className='header-secondary__brand'>
          <a name='home' id='home' className='header-secondary__title'>MyReadingRoom @ Archives & Special Collections</a>
          <p className='header-secondary__subtitle'>Submit requests in advance of your Reading Room visit</p>
        </div>
        <Nav ariaLabel='Main'>
          <NavItem href='/list/' id='list' label={`View My List${myListCount > 0 ? ` (${myListCount})` : ''}`} icon='arrow_right_alt' />
        </Nav>
      </div>
    </div>
  </header>)

export default Header
