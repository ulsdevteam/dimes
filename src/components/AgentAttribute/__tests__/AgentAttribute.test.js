import React from 'react';
import { render } from 'react-dom';
import AgentAttributeList from '..';

const items = [
  {"label": "foo", "value": "foobar", "note": true},
  {"label": "bar", "value": "barfoo", "note": false}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<AgentAttributeList items={items} />, div);
});
