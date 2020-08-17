import React, { Component } from "react";
import Search from "../Search"
import logo from "../../assets/homepage_logo.png"
import "./styles.scss";

class PageHome extends Component {
    render() {
        // TODO: add onClick handler to Search button
        // TODO: implement page background-color $light-grayish-yellow
        return (
            <div className="container">
              <div className="hero">
                  <div className="hero__logo">
                      <img alt={" "} src={logo} />
                  </div>
                  <h1 className="hero__text">
                      Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content.
                  </h1>
              </div>
              <Search className="search--home"/>
          </div>
        )
    }
}

export default PageHome;
