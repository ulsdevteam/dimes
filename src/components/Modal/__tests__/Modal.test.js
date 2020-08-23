import React from 'react';
import {render} from 'react-dom';
import {EmailModal} from '..';

import { items } from '../../../__fixtures__/resolvedList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<EmailModal
      appElement={div}
      handleError={function(){}}
      isOpen={true}
      list={items}
      toggleModal={function(){}} />, div);
});
