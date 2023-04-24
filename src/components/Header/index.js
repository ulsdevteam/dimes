import React from 'react'
import { Nav, NavItem } from '../Nav'
import { t, Trans } from '@lingui/macro'
import './styles.scss'

const Header = ({ myListCount }) => (
  <header className='header-secondary'>
    <div className='wrapper'>
      <div className='container'>
        <div className='header-secondary__brand'>
          <a href='/' id='home' className='header-secondary__title'>
            <Trans comment='Title displayed within the Header'>
              dimes.rockarch.org
            </Trans>
          </a>
          <p className='header-secondary__subtitle'>
            <Trans comment='Subtitle displayed within the Header'>
              The Online Collection and Catalog of Rockefeller Archive Center
            </Trans>
          </p>
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
