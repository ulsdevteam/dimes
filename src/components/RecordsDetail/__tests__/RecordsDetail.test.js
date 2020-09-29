import React from "react";
import { render } from "react-dom";
import RecordsDetail from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
            activeRecords={collectionWithChildHits}
            isLoading={false}
            isSaved={false}
            removeItem={function(){}}
            saveItem={function(){}}
            toggleSaved={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
          activeRecords={object}
          isLoading={false}
          isSaved={true}
          removeItem={function(){}}
          saveItem={function(){}}
          toggleSaved={function(){}}/>, div);
});
