import React from 'react';
import { render } from 'react-dom';
import SocialIcons from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SocialIcons />, div);
});
