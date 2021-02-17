import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageAgent from '..'

import { agent } from '../../../__fixtures__/agents'
import { collections } from '../../../__fixtures__/agents'

let container = null
beforeEach(() => {
  container = document.createElement('div')
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
    if (url.includes('agents')) {
      return Promise.resolve({data: agent})
    } else if (url.includes('search')) {
      return Promise.resolve({data: collections})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })
  act(() => {
    render(<PageAgent
      location={{ search: '?category=&limit=40&query=nelson%20rockefeller' }}
      match={{params: { id: 'nQV9zedPVBqFgyGrXPQvBw' }}} />, container)
  })

  const title = await document.querySelector('h1')
  const children = await document.querySelector('.tile-list')

  expect(title.textContent).toBe('Rockefeller, Nelson A. (Nelson Aldrich)')
  expect(children.children.length).toBe(8)
})
