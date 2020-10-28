import React from "react";
import { render } from "react-dom";
import RecordsContent from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { children } from '../../../__fixtures__/children';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            children={children}
            collection={collectionWithChildHits}
            isContentShown={true}
            params={{}}
            preExpanded={[]}
            savedList={{}}
            setActiveRecords={function(){}}
            toggleInList={function(){}}
            toggleIsLoading={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            children={children}
            collection={collectionWithChildHits}
            isContentShown={false}
            params={{}}
            preExpanded={[]}
            savedList={{}}
            setActiveRecords={function(){}}
            toggleInList={function(){}}
            toggleIsLoading={function(){}} />, div);
});
