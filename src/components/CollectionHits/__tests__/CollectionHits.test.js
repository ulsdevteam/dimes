import React from "react";
import { render } from "react-dom";
import CollectionHits from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { children } from '../../../__fixtures__/children';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionHits
            collection={collectionWithChildHits}
            children={children}
            isChildrenLoading={false}
            isCollectionLoading={false}
            params={{}} />, div);
        });
