import React from 'react';
import {render} from 'react-dom';
import {ModalSavedItemList} from '..';

import { resolvedList } from '../../../__fixtures__/resolvedList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ModalSavedItemList
          items={resolvedList}
          handleChange={function(){}}
          setSubmit={function(){}} />, div);
});
