import React, { useEffect } from "react";
import Hero from "../Hero";
import SearchForm from "../SearchForm";
import { firePageViewEvent } from "../Helpers";
import "./styles.scss";

const PageHome = () => {

  useEffect(() => { firePageViewEvent() }, [])

  return (
    <div className="container--full-width home">
      <Hero />
      <SearchForm className="search-form--home"/>
    </div>)
}

export default PageHome;
