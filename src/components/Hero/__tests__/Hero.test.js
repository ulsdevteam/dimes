import React from 'react';
import {render} from 'react-dom';
import Hero from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Hero />, div);
});
