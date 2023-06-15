import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { I18nApp } from '../../i18n'
import TileList from '..'

import { tileItems } from '../../../__fixtures__/tileItems'

it('renders props correctly', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  act(() => {
    render(<I18nApp ReactComponent={<TileList items={tileItems} />} />, div)
  })

  const tile = document.querySelector('.tile')
  expect(tile.querySelector('.tile__title').textContent).toBe('Rockefeller Foundation records')
  expect(tile.querySelector('.tile__type-label').textContent).toBe('archive_box.svgcollection')
  expect(tile.querySelector('.tile__date').textContent).toBe('1910-2000 (Bulk: 1924-1990), 1924-1990')
})
