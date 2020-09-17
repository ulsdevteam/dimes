import React from 'react';
import {render} from 'react-dom';
import { CollectionHitsModal, DuplicationRequestModal, EmailModal, FacetModal, ReadingRoomRequestModal } from '..';

import { resolvedList } from '../../../__fixtures__/resolvedList';
import { submitList } from '../../../__fixtures__/submitList';
import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { facet } from '../../../__fixtures__/facet';

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionHitsModal
      appElement={div}
      isOpen={true}
      data={collectionWithChildHits}
      toggleModal={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<FacetModal
      appElement={div}
      handleChange={function(){}}
      handleDateChange={function(){}}
      isOpen={true}
      params={{}}
      data={{}}
      toggleModal={function(){}} />, div);
});
