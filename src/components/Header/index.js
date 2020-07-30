import React, { Component } from "react";
import {Nav, NavItem} from "../Nav";
import "./styles.scss";

class Header extends Component {
  render() {
    return (
      <header className="header-secondary">
        <div className="container">
          <div className="header-secondary__brand">
            <a href="/" className="header-secondary__title">dimes.rockarch.org</a>
            <p className="header-secondary__subtitle">The Online Collection and Catalog of Rockefeller Archive Center</p>
          </div>
          <Nav ariaLabel="Main">
            <NavItem href="#" label="Sign in to RACcess" icon="&rarr;" />
            <NavItem href="#" label="My List" icon="&rarr;" />
          </Nav>
        </div>
      </header>
    )
  }
}

export default Header;
