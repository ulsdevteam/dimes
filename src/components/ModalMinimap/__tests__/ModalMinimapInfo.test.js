import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { ModalMinimapInfo } from '..'

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
    render(<ModalMinimapInfo
      appElement={container}
      isOpen
      toggleModal={jest.fn()} />, container)
  })
})

it('handles clicks correctly', () => {
  const toggleModal = jest.fn()

  act(() => {
    render(<ModalMinimapInfo
      appElement={container}
      isOpen
      toggleModal={toggleModal} />, container)
  })

  const button = document.querySelector('.modal-header__button')

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

  expect(toggleModal).toHaveBeenCalledTimes(1)
})
