import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Badge } from '..'

it('renders without errors', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<Badge text={"foobar"} />, div)
  })
})
