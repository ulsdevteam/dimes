import React from 'react'
import { Nav, NavItem } from '../Nav'
import { t, Trans } from '@lingui/macro'

const Header = ({ myListCount }) => (
  <header className='header header--blue'>
    <div className='wrapper'>
      <div className='container flex'>
        <div className='header__brand header__brand--text'>
          <a href='/' id='home' className='header__brand-title'>
            <Trans comment='Title displayed within the Header'>
              MyReadingRoom @ Archives & Special Collections
            </Trans>
          </a>
          <div className='header__brand-subtitle'>
            <Trans comment='Subtitle displayed within the Header'>
              Submit requests in advance of your Reading Room visit
            </Trans>
          </div>
        </div>
        <Nav ariaLabel='Main'>
          <NavItem id='raccess' icon='arrow_right_alt'
            href={t({
              comment: 'Link used for sign-in within the Header',
              message: 'https://raccess.rockarch.org'
            })}
            label={t({
              message: 'Sign in to RACcess'
            })} />
          <NavItem href='/list/' id='list'
            label={
              t({
                comment: 'Message shown on button within the Header',
                message: 'My List'
              })+`${myListCount > 0 ? ` (${myListCount})` : ''}`
            } icon='arrow_right_alt' />
        </Nav>
      </div>
    </div>
  </header>)

export default Header
