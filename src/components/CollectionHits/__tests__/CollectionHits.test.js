import React from "react";
import { render } from "react-dom";
import CollectionHits from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionHits collection={collectionWithChildHits}/>, div);
});
