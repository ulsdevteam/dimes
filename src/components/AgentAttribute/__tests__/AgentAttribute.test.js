import React from 'react'
import { render } from 'react-dom'
import AgentAttributeList from '..'

const items = {'Positions Held': 'foo', 'Date of Birth': 'bar', 'Date of Dath': 'baz'}

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<AgentAttributeList items={items} />, div)
})
