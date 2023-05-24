import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import ContextSwitcher from '..'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<ContextSwitcher
      isContentShown={false}
      toggleIsContentShown={jest.fn()} />} />, div)
  })

  const switcher = document.querySelector('.toggle-wrapper > button')
  expect(switcher.className).toBe('btn toggle-context')
  expect(switcher.textContent).toContain('Collection Content')

  act(() => {
    render(<I18nApp ReactComponent={<ContextSwitcher
      isContentShown
      toggleIsContentShown={jest.fn()} />} />, div)
  })

  expect(switcher.className).toBe('btn toggle-context')
  expect(switcher.textContent).toContain('Collection Details')
})
