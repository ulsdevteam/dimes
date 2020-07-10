import React from "react";
import { render } from "react-dom";
import { CheckBox } from "../components/Inputs";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CheckBox label="Do you want to proceed?" id="1" />, div);
});
