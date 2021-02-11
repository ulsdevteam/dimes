import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import MaterialIcon from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<MaterialIcon icon='close' />, div)
  })

  const icon = document.querySelector('span')
  expect(icon.textContent).toBe('close')
  expect(icon).toHaveAttribute('aria-hidden', 'true')

  act(() => {
    render(<MaterialIcon icon='archive_box' />, div)
  })

  expect(icon).toHaveAttribute('aria-hidden', 'true')
})
