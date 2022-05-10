import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook'
import MaterialIcon from '../MaterialIcon'
import '../Button/styles.scss'
import classnames from 'classnames'
import './styles.scss'

const Dropdown = (props) => {
  const [className] = useState(props.className)
  const [iconBefore] = useState(props.iconBefore)
  const [iconBeforeOpen] = useState(props.iconBeforeOpen)
  const [items] = useState(props.items)
  const [itemClassName] = useState(props.itemClassName)
  const [label] = useState(props.label)
  const [listClassName] = useState(props.listClassName)
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(items.length)
  const openIcon = iconBeforeOpen ? iconBeforeOpen : iconBefore
  const listItems = items.map((item, idx) =>
    <a
      key={idx}
      id={`menu-item-${idx}`}
      className={classnames('btn', itemClassName)}
      onClick={item.handleClick}
      href={item.href}
      title={item.title}
      {...itemProps[idx]}>
      {item.iconBefore && <MaterialIcon icon={item.iconBefore} />}
      {item.label}{item.iconAfter && <MaterialIcon icon={item.iconAfter} />}
    </a>
  )
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
        {listItems}
      </div>
    </div>
  )
}

export const MyListDropdown = ({ downloadCsv, duplicationRequest, emailList, readingRoomRequest, removeAllItems }) => (
  <Dropdown
    label='Actions'
    iconBefore='settings'
    className='mylist__actions'
    buttonClassName='btn btn--gold btn--md'
    itemClassName='btn--gold btn--dropdown dropdown__item--gold'
    listClassName='dropdown__list--orange dropdown__list--slide-down'
    items={
    [
      {
        'label': 'Schedule a Visit',
        'iconBefore': 'account_balance',
        'href': `mailto:${process.env.REACT_APP_EMAIL}?subject=Scheduling a research appointment`,
        'title': 'opens email'
      },
      {
        'label': 'Request in Reading Room',
        'iconBefore': 'local_library',
        'handleClick': readingRoomRequest
      },
      {
        'label': 'Request Copies',
        'iconBefore': 'content_copy',
        'handleClick': duplicationRequest
      },
      {
        'label': 'Remove All Items',
        'iconBefore': 'delete',
        'handleClick': removeAllItems
      }
    ]
    } />
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
    itemClassName='btn--navy btn--mobile-dropdown'
    listClassName='dropdown__list--mobile dropdown__list--navy dropdown__list--slide-left'
    items={
    [
      {
        'label': 'My List',
        'iconAfter': 'east',
        'href': '/list'
      }
    ]
    } />
)
