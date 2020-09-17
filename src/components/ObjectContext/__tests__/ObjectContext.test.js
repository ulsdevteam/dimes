import React from "react";
import { render } from "react-dom";
import ObjectContext from "..";

import { object } from '../../../__fixtures__/object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ObjectContext object={object} />, div);
});
