import React from 'react'
import { render } from 'react-dom'
import MyListExportActions from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<MyListExportActions
    confirmDeleteAll={jest.fn()}
    downloadCsv={jest.fn()}
    emailList={jest.fn()}
            />, div)
})
