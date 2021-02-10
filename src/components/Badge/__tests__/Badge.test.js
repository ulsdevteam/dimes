import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Badge from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<Badge label='This is a badge' />, div)
  })

  const badge = document.querySelector('span')
  expect(badge.textContent).toContain('This is a badge')

  act(() => {
    render(<Badge className='foo' icon='bar' label='This is a badge' />, div)
  })

  expect(badge.className).toBe('foo')
  expect(badge.textContent).toContain('bar')
  expect(badge.textContent).toContain('This is a badge')
})
