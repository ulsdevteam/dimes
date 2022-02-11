import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageMyList from '..'

import { resolvedList } from '../../../__fixtures__/resolvedList'
import { parsedItem } from '../../../__fixtures__/parsedItem'

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
  axios.post.mockImplementation((url) => {
    if (url.includes('mylist')) {
      return Promise.resolve({ data: resolvedList })
    } else if (url.includes('process-request/parse')) {
      return Promise.resolve({ data: parsedItem })
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  axios.get.mockImplementation((url) => {
    if (url.includes('status/health/ping_all')) {
      return Promise.resolve({ data: { pong: true } })
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(<PageMyList
      removeAllListItems={jest.fn()}
      toggleInList={jest.fn()} />, container)
  })

  const list = await document.querySelector('.saved-items')

  expect(list.children.length).toBe(2)

})
