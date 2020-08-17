import React, { Component } from "react";
import Button from "../Button"
import PropTypes from "prop-types";
import { SelectInput, SelectOption, TextInput } from "../Inputs";
import "./styles.scss";


// TODO: add onClick handler to Search button
class Search extends Component {
  render () {
    return (
      <form role="search" action="/search" method="get">
        <div className={`search ${this.props.className}`}>
          <div className="input-group__search">
            <TextInput
              className="hide-label input__search"
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
    )
  }
}

Search.propTypes = {
  className: PropTypes.string,
}

export default Search;