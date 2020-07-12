import React from 'react';
import {render} from 'react-dom';
import {Nav, NavItem} from '../components/Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Nav />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<NavItem href="#" label="Nav Item" />, div);
});
