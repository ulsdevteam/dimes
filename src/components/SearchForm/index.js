import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../Button"
import PropTypes from "prop-types";
import { TextInput } from "../Inputs";
import "./styles.scss";


const SearchForm = props => {
  var [category, setCategory] = useState(props.category);
  var [query, setQuery] = useState(props.query);

  useEffect(() => {
    setCategory(props.category);
    setQuery(props.query);
  }, [props.category, props.query] );

  const selectOptions = [
    { value: "", label: "Everything" },
    { value: "collection", label: "Collections" },
    { value: "person", label: "People" },
    { value: "organization", label: "Organizations"}
  ]

  /** Removes existing styling */
  const selectStyles = {
    option: () => ({}),
    control: () => ({}),
    dropdownIndicator: () => ({}),
    indicatorsContainer: () => ({}),
    indicatorSeparator: () => ({}),
    valueContainer: () => ({}),
  }

  return (
  <form role="search" action="/search" method="get">
    <div className={props.className}>
      <div className="input-group__search">
        <TextInput
          className="hide-label input__search"
          label="Enter a search term"
          id="query"
          placeholder="Search..."
          size={60}
          value={query}
          handleChange={e => setQuery(e.target.value)}
          type="search"
          required={true}
        />
        <Select
          aria-label="Choose a search category"
          className="select__search--wrapper"
          classNamePrefix="select__search"
          defaultValue={{ value: "", label: "Everything" }}
          isSearchable={false}
          name="category"
          onChange={e => setCategory(e)}
          options={selectOptions}
          styles={selectStyles}
          value={(selectOptions ? selectOptions.find(option => option.value === category) : '')}
        />
        <Button
          className="btn--search"
          type="submit"
          ariaLabel="Submit search"
          iconBefore="search"
        />
      </div>
    </div>
  </form>)}

SearchForm.propTypes = {
  className: PropTypes.string,
}

export default SearchForm;
