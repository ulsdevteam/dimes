import React from "react";
import { render } from "react-dom";
import RecordsContent from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            isContentShown={true}
            parent={collectionWithChildHits}
            setActiveRecords={function(){}}
            toggleIsLoading={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            isContentShown={false}
            parent={object}
            setActiveRecords={function(){}}
            toggleIsLoading={function(){}} />, div);
});
