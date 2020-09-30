import React from "react";
import { render } from "react-dom";
import RecordsDetail from "..";

import { ancestors } from '../../../__fixtures__/ancestors';
import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
            ancestors={{}}
            isAncestorsLoading={false}
            isLoading={false}
            isSaved={false}
            records={collectionWithChildHits}
            removeItem={function(){}}
            saveItem={function(){}}
            toggleSaved={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
          ancestors={ancestors}
          isAncestorsLoading={false}
          isLoading={false}
          isSaved={true}
          records={object}
          removeItem={function(){}}
          saveItem={function(){}}
          toggleSaved={function(){}}/>, div);
});
