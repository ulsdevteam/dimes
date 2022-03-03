import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Minimap from '..'

import { minimap } from '../../../__fixtures__/minimap.js'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(
      <Minimap
        data={minimap}
        isLoading={false}
        params={{}} />, div)
  })

})
