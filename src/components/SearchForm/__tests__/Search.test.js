import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Search from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<Search className='foo' />, div)
  })

  const wrapper = document.querySelector('form > div')
  expect(wrapper.className).toBe('foo')
})
