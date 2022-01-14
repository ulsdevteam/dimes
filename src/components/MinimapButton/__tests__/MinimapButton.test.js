import React from 'react'
import { render } from 'react-dom'
import MinimapButton from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<MinimapButton toggleMinimapModal={jest.fn()}/>, div)
})
