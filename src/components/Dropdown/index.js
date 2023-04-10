import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook'
import MaterialIcon from '../MaterialIcon'
import { t } from '@lingui/macro'
import '../Button/styles.scss'
import classnames from 'classnames'
import './styles.scss'

const DropdownItem = (props) => (
  <a
    key={props.order}
    id={`menu-item-${props.order}`}
    className={classnames('btn', props.className)}
    onClick={props.handleClick}
    href={props.href}
    title={props.title}>
    {props.iconBefore && <MaterialIcon icon={props.iconBefore} />}
    {props.label}{props.iconAfter && <MaterialIcon icon={props.iconAfter} />}
  </a>
)

const Dropdown = (props) => {
  const [className] = useState(props.className)
  const [iconBefore] = useState(props.iconBefore)
  const [iconBeforeOpen] = useState(props.iconBeforeOpen)
  const [label] = useState(props.label)
  const [listClassName] = useState(props.listClassName)
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(props.children && props.children.length)
  const openIcon = iconBeforeOpen ? iconBeforeOpen : iconBefore

  return (
    <div className={classnames('dropdown', className)}>
      <button
        className={classnames(props.buttonClassName, { 'open': isOpen, 'closed': !isOpen })}
        {...buttonProps} >
        {isOpen ? (<MaterialIcon icon={openIcon} />) : (iconBefore && <MaterialIcon icon={iconBefore} />)}
        {label}
      </button>
      <div
        className={classnames('dropdown__list', listClassName, { 'open': isOpen, 'closed': !isOpen})}
        role='menu' >
        {props.children}
      </div>
    </div>
  )
}

export const MyListDropdown = ({ downloadCsv, duplicationRequest, emailList, readingRoomRequest, removeAllItems }) => (
  <Dropdown
    label={t({
      comment: 'Message shown on Dropdown button',
      message: 'Actions'
    })}
    iconBefore='settings'
    className='mylist__actions'
    buttonClassName='btn btn--orange btn--md'
    listClassName='dropdown__list--orange dropdown__list--slide-down'>
      <DropdownItem
        order={1}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Schedule a Visit'
        })}
        iconBefore='account_balance'
        href='mailto:archive@rockarch.org?subject=Scheduling a research appointment'
        title={t({
          comment: 'Tooltip for button',
          message: 'opens email'
        })} />
      <DropdownItem
        order={2}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Request in Reading Room'
        })}
        iconBefore='local_library'
        handleClick={readingRoomRequest}/>
      <DropdownItem
        order={3}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Request Copies'
        })}
        iconBefore='content_copy'
        handleClick={duplicationRequest}/>
      <DropdownItem
        order={4}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Email List'
        })}
        iconBefore='email'
        handleClick={emailList}/>
      <DropdownItem
        order={5}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Download as .csv'
        })}
        iconBefore='get_app'
        handleClick={downloadCsv}/>
      <DropdownItem
        order={6}
        className='btn--orange btn--dropdown dropdown__item--orange'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'Remove All Items'
        })}
        iconBefore='delete'
        handleClick={removeAllItems}/>
    </Dropdown>
  )

MyListDropdown.propTypes = {
  downloadCsv: PropTypes.func.isRequired,
  duplicationRequest: PropTypes.func.isRequired,
  emailList: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired
}

export const NavDropdown = () => (
  <Dropdown
    iconBefore='menu'
    iconBeforeOpen='close'
    className='hide-on-lg-up'
    buttonClassName='btn nav-mobile__btn'
    listClassName='dropdown__list--mobile dropdown__list--navy dropdown__list--slide-left'>
      <DropdownItem
      order={1}
      className='btn--navy btn--mobile-dropdown'
      label={t({
        comment: 'Message shown on button within Dropdown list',
        message: 'Sign in to RACcess'
      })}
      iconAfter='east'
      href={t({
        comment: 'Link used for sign-in within Dropdown list',
        message: 'https://raccess.rockarch.org'
      })} />
      <DropdownItem
        order={2}
        className='btn--navy btn--mobile-dropdown'
        label={t({
          comment: 'Message shown on button within Dropdown list',
          message: 'My List'
        })}
        iconAfter='east'
        href='/list' />
    </Dropdown>
)
