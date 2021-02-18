import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageNotFound from '..'

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

it('renders props correctly', () => {

  act(() => {
    render(<PageNotFound  />, container)
  })

  expect(document.querySelector('h1').textContent).toBe('Sorry, the requested page was not found!')

})
