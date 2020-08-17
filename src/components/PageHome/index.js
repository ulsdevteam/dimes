import React, { Component } from "react";
import Button from "../Button"
import logo from "../../assets/homepage_logo.png"
import { SelectInput, SelectOption, TextInput } from "../Inputs";
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
              <form role="search" action="/search" method="get">
                <div className="search search--home">
                  <div className="input-group__search">
                    <TextInput
                        className="hide-label input__search" //we can also use aria-label with no label element instead of a hidden label, but would need to alter the component
                        label="Enter a search term"
                        id="query"
                        placeholder="Search..."
                        size="60"
                        type="search"
                    />
                    <div class="select__search--wrapper">
                      <SelectInput className="hide-label select__search" id="type" label="Choose a search category">
                        <SelectOption label="Everything" />
                        <SelectOption label="Collections" />
                        <SelectOption label="People" />
                        <SelectOption label="Organizations" />
                      </SelectInput>
                    </div>
                    <Button
                        className="btn--search"
                        type="submit"
                        aria-label="Submit search"
                        iconBefore="search"
                    />
                </div>
              </div>
            </form>
          </div>
        )
    }
}

export default PageHome;
