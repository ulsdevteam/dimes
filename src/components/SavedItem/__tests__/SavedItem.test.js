import React from 'react';
import {render} from 'react-dom';
import {SavedItemList} from '..';

import { resolvedList } from '../../../__fixtures__/resolvedList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SavedItemList
          items={resolvedList}
          isLoading={true}
          removeFromList={function(){}} />, div);
});
