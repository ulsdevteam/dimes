import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import SearchNotFound from '..'

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

const suggestions = ["foo", "bar"]

it('renders props correctly', () => {
  act(() => {render(<SearchNotFound suggestions={suggestions} />, container)})
  const list = document.querySelector('.suggestions')
  expect(list.children.length).toBe(suggestions.length)
  suggestions.map(s => {
    expect(list.textContent).toContain(s)
  })
})
