import React from 'react';
import {render} from 'react-dom';
import Header from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Header />, div);
});
