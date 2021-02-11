import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ListToggleButton from '..'

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

it('renders correctly in desktop and modal', () => {
  act(() => {
    render(<ListToggleButton
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />, container)
  })

  const button = document.querySelector('button')
  expect(button.textContent).toContain('Add to List')
  expect(button).toHaveAttribute('aria-label', 'Add item to list')
  expect(button.className).not.toContain('saved')

  act(() => {
    render(<ListToggleButton
      isSaved
      item={object}
      toggleSaved={jest.fn()} />, container)
  })

  expect(button.textContent).toContain('Remove from List')
  expect(button).toHaveAttribute('aria-label', 'Remove item from list')
  expect(button.className).toContain('saved')

  act(() => {
    render(<ListToggleButton
      isMobile
      isSaved={false}
      item={object}
      toggleSaved={jest.fn()} />, container)
  })

  expect(button.textContent).toContain('Add')

  act(() => {
    render(<ListToggleButton
      isMobile
      isSaved
      item={object}
      toggleSaved={jest.fn()} />, container)
  })

  expect(button.textContent).toContain('Remove')
})

it('handles clicks correctly', () => {
  const toggleSaved = jest.fn()

  act(() => {
    render(<ListToggleButton
      isSaved={false}
      item={object}
      toggleSaved={toggleSaved} />, container)
  })

  const button = document.querySelector('button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleSaved).toHaveBeenCalledTimes(1)
})
