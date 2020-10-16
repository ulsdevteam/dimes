import React from 'react';
import {render} from 'react-dom';
import { DuplicationRequestModal, EmailModal, ReadingRoomRequestModal } from '..';

import { resolvedList } from '../../../__fixtures__/resolvedList';
import { submitList } from '../../../__fixtures__/submitList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<EmailModal
      appElement={div}
      handleChange={function(){}}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      submitList={submitList}
      toggleList={function(){}}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ReadingRoomRequestModal
      appElement={div}
      handleChange={function(){}}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      submitList={submitList}
      toggleList={function(){}}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DuplicationRequestModal
      appElement={div}
      handleChange={function(){}}
      handleFormSubmit={function(){}}
      isOpen={true}
      list={resolvedList}
      submitList={submitList}
      toggleList={function(){}}
      toggleModal={function(){}} />, div);
});
