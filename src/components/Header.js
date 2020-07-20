import React, { Component } from "react";
import {Nav, NavItem} from "./Nav";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="rac-header-secondary">
        <div className="container">
          <div className="header__brand">
            <a href="/" class="title">dimes.rockarch.org</a>
            <p className="subtitle">The Online Collection and Catalog of Rockefeller Archive Center</p>
          </div>
          <Nav className="header__nav" ariaLabel="Main">
            <NavItem href="#" label="Sign in to RACcess" icon="&rarr;" />
            <NavItem href="#" label="My List" icon="&rarr;" />
          </Nav>
        </div>
      </header>
    )
  }
}

export default Header;
