import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Viewer from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<Viewer config={{id: 'foo'}}/>, div)
  })

})
