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
            myListCount={1}
            params={{}}
            preExpanded={[]}
            setActiveRecords={function(){}}
            toggleInList={function(){}} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContent
            children={children}
            collection={collectionWithChildHits}
            isContentShown={false}
            myListCount={0}
            params={{}}
            preExpanded={[]}
            setActiveRecords={function(){}}
            toggleInList={function(){}} />, div);
});
