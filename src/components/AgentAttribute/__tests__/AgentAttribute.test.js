import React from 'react';
import ReactDOM from 'react-dom';
import AgentAttributeList from '..';

const items = [
  {"label": "foo", "value": "foobar", "note": true},
  {"label": "bar", "value": "barfoo", "note": false}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AgentAttributeList items={items} />, div);
});
