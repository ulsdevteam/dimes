import React from "react";
import { render } from "react-dom";
import RecordsContext from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContext records={collectionWithChildHits} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsContext records={object} />, div);
});
