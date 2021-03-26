import React from 'react'
import { render } from 'react-dom'
import SearchNotFound from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<SearchNotFound />, div)
})
