import React from 'react';
import ReactDOM from 'react-dom';
import AgentAttributeList from '../../AgentAttribute';

const items = [
  {"label": "foo", "value": "foobar"},
  {"label": "bar", "value": "barfoo"}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AgentAttributeList items={items} />, div);
});
