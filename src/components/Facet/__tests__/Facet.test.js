import React from "react";
import { render } from "react-dom";
import Facet from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Facet />, div);
});
