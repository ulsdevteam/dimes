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
            isContentShown={false}
            isItemLoading={false}
            item={collectionWithChildHits}
            myListCount={0}
            params={{}}
            toggleInList={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsDetail
          ancestors={ancestors}
          isAncestorsLoading={false}
          isContentShown={true}
          isItemLoading={false}
          item={object}
          myListCount={0}
          params={{}}
          toggleInList={function(){}} />, div);
});
