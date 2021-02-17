import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import PageHome from '..'

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
    render(<PageHome  />, container)
  })

  expect(document.querySelector('h1').textContent).toBe('Search Our Collections.Discover People and Organizations.Access Digital Content.')

})
