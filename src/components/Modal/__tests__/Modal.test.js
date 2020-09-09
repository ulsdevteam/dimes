import React from 'react';
import {render} from 'react-dom';
import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from '..';

import { resolvedList } from '../../../__fixtures__/resolvedList';
import { submitList } from '../../../__fixtures__/submitList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<EmailModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      loadListData={function(){}}
      submitList={submitList}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ReadingRoomRequestModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      loadListData={function(){}}
      submitList={submitList}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DuplicationRequestModal
      appElement={div}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      loadListData={function(){}}
      submitList={submitList}
      toggleModal={function(){}} />, div);
});
