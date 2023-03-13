import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Button from '../Button'
import PropTypes from 'prop-types'
import { CheckBoxInput, SelectInput, TextInput } from '../Inputs'
import { isMobile } from '../Helpers'
import './styles.scss'

const SearchForm = props => {
  var [category, setCategory] = useState(props.category || '')
  var [online, setOnline] = useState(props.online)
  var [query, setQuery] = useState(props.query)
  const isHomePage = props.className === 'search-form--home'

  /** Sets the search category, query and online checkbox */
  useEffect(() => {
    setOnline(props.online ? true : false)
    setCategory(props.category || '')
    setQuery(props.query)
  }, [props.category, props.online, props.query])

  const selectOptions = [
    { value: '', label: 'All Types' },
    { value: 'collection', label: 'Collections' },
    { value: 'person', label: 'People' },
    { value: 'organization', label: 'Organizations'}
  ]

  return (
    <form role='search' action='/search' method='get'>
      <div className="search wrapper">
        <div className={props.className}>
          <div className={classnames('input-group__search', { 'input-group__search-results': !isHomePage })}>
            <TextInput
              className={classnames('hide-label', 'input__search', { 'input__search-results': !isHomePage })}
              label='Enter a search term'
              id='query'
              placeholder='Search...'
              size={60}
              value={query || ''}
              handleChange={e => setQuery(e.target.value)}
              type='search'
              required
            />
            <Button
              className={ classnames({ 'btn--orange search__submit-btn': isHomePage, 'btn btn--orange search__submit-btn search__results-submit-btn': !isHomePage })}
              type='submit'
              label={isHomePage ? (isMobile ? null : 'Search') : null}
              iconAfter='search'
              ariaLabel='Submit search'
            />
          </div>
          <div className={classnames(
              'input-group__search-controls',
              { 'input-group__search-controls-results' : !isHomePage })}>
            <SelectInput
              className='select__search'
              hideLabel
              iconAfter='expand_more'
              id='category'
              label='Choose a search category'
              name='category'
              onChange={({ selectedItem }) => {
                isHomePage ? setCategory(selectedItem.value) : props.handleSearchFormChange(selectedItem.value, query, online)
              }}
              options={ selectOptions }
              selectedItem={ category || '' }
            />
            <CheckBoxInput
              id='online'
              name='online'
              className='checkbox--blue checkbox--online input--outline'
              checked={online}
              handleChange={e => {
                isHomePage ? setOnline(e.target.checked) : props.handleSearchFormChange(category, query, e.target.checked)
              }}
              label='Show only results with digital matches'
            />
          </div>
        </div>
      </div>
    </form>)
}

SearchForm.propTypes = {
  className: PropTypes.string,
  handleOnlineChange: PropTypes.func
}

export default SearchForm
