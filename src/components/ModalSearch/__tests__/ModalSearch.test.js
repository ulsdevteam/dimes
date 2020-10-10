import React from 'react';
import {render} from 'react-dom';
import { CollectionHitsModal, FacetModal } from '..';

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { children } from '../../../__fixtures__/children';
import { facet } from '../../../__fixtures__/facet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionHitsModal
      appElement={div}
      children={children}
      collection={collectionWithChildHits}
      isChildrenLoading={false}
      isCollectionLoading={false}
      isOpen={true}
      params={{}}
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
