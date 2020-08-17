import React, { Component } from "react";
import Hero from "../Hero"
import Search from "../Search"
import "./styles.scss";

class PageHome extends Component {
    render() {
        // TODO: implement page background-color $light-grayish-yellow
        return (
            <div className="container">
              <Hero />
              <Search className="search--home"/>
          </div>
        )
    }
}

export default PageHome;
