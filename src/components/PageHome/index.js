import React from "react";
import Hero from "../Hero";
import SearchForm from "../SearchForm";
import "./styles.scss";

const PageHome = () => (
// TODO: implement page background-color $light-grayish-yellow
  <div className="container">
    <Hero />
    <SearchForm className="search-form--home"/>
  </div>)

export default PageHome;
