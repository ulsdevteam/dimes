import React from 'react';
import {render} from 'react-dom';
import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from '..';

import { items } from '../../../__fixtures__/resolvedList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<EmailModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={items}
      loadListData={function(){}}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ReadingRoomRequestModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={items}
      loadListData={function(){}}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DuplicationRequestModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={items}
      loadListData={function(){}}
      toggleModal={function(){}} />, div);
});
