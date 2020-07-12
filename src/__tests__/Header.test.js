import React from 'react';
import {render} from 'react-dom';
import Header from '../components/Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Header />, div);
});
