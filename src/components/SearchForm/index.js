import React, { useEffect, useState } from 'react'
import Button from '../Button'
import PropTypes from 'prop-types'
import { CheckBoxInput, SelectInput, TextInput } from '../Inputs'
import './styles.scss'

const SearchForm = props => {
  var [category, setCategory] = useState(props.category || '')
  var [online, setOnline] = useState(props.online)
  var [query, setQuery] = useState(props.query)

  /** Sets the search category, query and online checkbox */
  useEffect(() => {
    setCategory(props.category)
    setOnline(props.online ? true : false)
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
      <div className={props.className}>
        <div className='input-group__search'>
          <TextInput
            className='hide-label input__search'
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
            className='btn--search'
            type='submit'
            label='Search'
            iconBefore='search'
          />
          <SelectInput
            className='select__search'
            hideLabel
            iconAfter='expand_more'
            id='category'
            label='Choose a search category'
            name='category'
            onChange={({selectedItem}) => setCategory(selectedItem.value)}
            options={selectOptions}
            selectedItem={category || ''}
          />
          <CheckBoxInput
            id='online'
            name='online'
            className='checkbox--blue input--outline'
            checked={online}
            handleChange={e => setOnline(e.target.checked)}
            label='Show only results with digital matches'
          />
        </div>
      </div>
    </form>)
}

SearchForm.propTypes = {
  className: PropTypes.string
}

export default SearchForm
