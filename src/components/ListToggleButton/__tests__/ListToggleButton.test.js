import React from 'react';
import ReactDOM from 'react-dom';
import ListToggleButton from '..';

import { object } from '../../../__fixtures__/object';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListToggleButton
                    isSaved={false}
                    item={object}
                    toggleSaved={function(){}} />, div);
});
