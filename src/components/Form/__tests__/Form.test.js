import React from "react";
import { render } from "react-dom";
import { FormGroup, FormButtons } from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<FormButtons submitText="foo" toggleModal={() => {}} />, div);
});
