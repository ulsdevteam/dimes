import React from "react";
import { render } from "react-dom";
import RecordsContent from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            isContentShown={true}
            params={{}}
            parent={collectionWithChildHits}
            savedList={{}}
            setActiveRecords={function(){}}
            toggleInList={function(){}}
            toggleIsLoading={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            isContentShown={false}
            params={{}}
            parent={object}
            savedList={{}}
            setActiveRecords={function(){}}
            toggleInList={function(){}}
            toggleIsLoading={function(){}} />, div);
});
