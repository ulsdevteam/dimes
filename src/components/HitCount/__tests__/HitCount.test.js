import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { HitCountBadge } from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<HitCountBadge hitCount={5} />, div)
  })

  const hitCount = document.querySelector('.hit-count')
  expect(hitCount.textContent).toBe('5 matches')

  act(() => {
    render(<HitCountBadge hitCount={10000} />, div)
  })

  expect(hitCount.textContent).toBe('10000+ matches')

  act(() => {
    render(<HitCountBadge hitCount={1} />, div)
  })

  expect(hitCount.textContent).toBe('1 match')
})
