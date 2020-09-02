import React from "react";
import Hero from "../Hero"
import Search from "../Search"
import "./styles.scss";

const PageHome = () => (
// TODO: implement page background-color $light-grayish-yellow
  <div className="container">
    <Hero />
    <Search className="search-form--home"/>
  </div>)

export default PageHome;
