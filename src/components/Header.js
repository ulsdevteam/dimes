import React, { Component } from "react";

import {Nav, NavItem} from "./Nav"

class Header extends Component {
  render() {
    return (
      <header>
        <a href="/" className="header__brand">dimes.rockarch.org</a>
        <p className="header__subtitle">The Online Collection and Catalog of Rockefeller Archive Center</p>
        <Nav className="header__nav">
          <NavItem href="#" label="Sign in to RACcess" icon=">" />
          <NavItem href="#" label="MyList" icon=">" />
        </Nav>
      </header>
    )
  }
}

export default Header;
