import React from "react";
import { render } from "react-dom";
import ObjectDetail from "..";

import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ObjectDetail object={object} />, div);
});
