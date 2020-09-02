import React from 'react';
import {render} from 'react-dom';
import Search from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Search />, div);
});
