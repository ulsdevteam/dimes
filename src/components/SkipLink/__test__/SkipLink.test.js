import React from 'react';
import { render } from 'react-dom';
import SkipLink from '../../SkipLink';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SkipLink contentAnchor="#main-content" />, div);
});
