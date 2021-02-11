import React from 'react'
import { render } from 'react-dom'
import { SearchPagination } from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(
    <SearchPagination
      handlePageClick={jest.fn()}
      offset={0}
      pageCount={20}
      pageSize={40}
    />, div)
})
