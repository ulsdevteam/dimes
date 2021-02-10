import React from 'react'
import { render } from 'react-dom'
import SkipLink from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<SkipLink />, div)
})
