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
            activeRecords={collectionWithChildHits}
            isLoading={false}
            isSaved={false}
            params={{}}
            removeItem={function(){}}
            saveItem={function(){}}
            toggleSaved={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
          ancestors={ancestors}
          isAncestorsLoading={false}
          activeRecords={object}
          isLoading={false}
          isSaved={true}
          params={{}}
          removeItem={function(){}}
          saveItem={function(){}}
          toggleSaved={function(){}}/>, div);
});
