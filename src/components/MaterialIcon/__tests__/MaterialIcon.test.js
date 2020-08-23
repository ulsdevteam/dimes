import React from 'react';
import {render} from 'react-dom';
import MaterialIcon from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MaterialIcon icon="close" />, div);
});
