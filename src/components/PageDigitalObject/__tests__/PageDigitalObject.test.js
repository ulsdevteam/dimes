import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageDigitalObject from '..'

import { object } from '../../../__fixtures__/object'

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
    console.log(url);
    if (url.includes('objects')) {
      return Promise.resolve({data: object})
    } else {
      return Promise.reject(new Error('not found'))
    }
  })

  await act(async () => {
    await render(<PageDigitalObject
      match={{params: { type: "objects", id: "AdnxgWuKKKheh2r3SvoAqZ" }}} />, container)
  })

})
