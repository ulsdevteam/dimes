import React from "react";
import { render } from "react-dom";
import CollectionDetail from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionDetail collection={collectionWithChildHits} />, div);
});
