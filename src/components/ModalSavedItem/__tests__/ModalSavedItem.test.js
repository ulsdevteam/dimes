import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import {ModalSavedItemList} from '..'

import { checkedList } from '../../../__fixtures__/checkedList'
import { resolvedList } from '../../../__fixtures__/resolvedList'

it('renders props correctly', async () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  await act(async () => {
    render(<ModalSavedItemList
      items={resolvedList}
      ignoreRestrictions={true}
      handleChange={jest.fn()}
      setSubmit={jest.fn()} />, div)
  })

  await act(async () => {
    const groupTitle = document.querySelector('.modal-item-group__title')
    expect(groupTitle.textContent).toBe('Cary Reich papers')
    const itemTitle = document.querySelector('.modal-saved-item > label')
    expect(itemTitle.textContent).toBe('Abramovitz, Max')
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).not.toBeChecked()
  })

  await act(async () => {
    render(<ModalSavedItemList
      items={checkedList}
      ignoreRestrictions={true}
      handleChange={jest.fn()}
      setSubmit={jest.fn()} />, div)
  })

  await act(async () => {
    const input = document.querySelector('.modal-saved-item > input')
    expect(input).toBeChecked()
  })
})
