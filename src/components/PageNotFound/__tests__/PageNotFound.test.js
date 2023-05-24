import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import PageNotFound from '..'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders props correctly', () => {

  act(() => {
    render(<I18nApp ReactComponent={<PageNotFound  />} />, container)
  })

  expect(document.querySelector('h1').textContent).toBe('Sorry, the requested page was not found!')

})
