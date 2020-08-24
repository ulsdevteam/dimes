import React from "react";
import PropTypes from "prop-types";
import MaterialIcon from "../MaterialIcon";
import {NavDropdown} from "../Dropdown";
import "./styles.scss";


export const NavItem  = ({ className, href, icon, label}) => (
  <li className={`nav__item ${className}`}>
    <a className={`nav__link ${className}`} href={href}>{label} {icon && <MaterialIcon icon={icon} />}</a>
  </li>)

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired
}

export const Nav = ({ ariaLabel, children, className}) => (
  <nav className={`nav ${className && className}`} aria-label={ariaLabel}>
    <ul className="nav__list">
      {children}
    </ul>
  </nav>)

Nav.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string
}
