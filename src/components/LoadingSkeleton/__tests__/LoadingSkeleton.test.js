import React from 'react';
import { render } from 'react-dom';
import { SearchSkeleton, MyListSkeleton } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SearchSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MyListSkeleton />, div);
});
