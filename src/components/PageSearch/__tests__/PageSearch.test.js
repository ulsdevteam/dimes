import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils'
import PageSearch from '..'

import { tileItems } from '../../../__fixtures__/tileItems'
import { facet } from '../../../__fixtures__/facet'
import { titleSuggest } from '../../../__fixtures__/suggest'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  container.setAttribute('id', 'root')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

jest.mock('axios')

it('renders props correctly', async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('facets')) {
      return Promise.resolve({data: {count: facet.length, results: facet}})
    } else if (url.includes('suggest')) {
      return Promise.resolve({data: titleSuggest})
    } else if (url.includes('search')) {
      return Promise.resolve({data: {count: tileItems.length, results: tileItems}})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(
      <MemoryRouter initialEntries={['/search?query=banana']}>
        <Routes>
          <Route path='/search' element={<PageSearch />} />
        </Routes>
      </MemoryRouter>, container)
  })

  const title = await document.querySelector('h1')

  expect(title.textContent).toBe('Search Results for “banana”')

})
