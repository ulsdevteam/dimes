import React from "react";
import { render } from "react-dom";
import { CheckBox, YearInput } from "../components/Inputs";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CheckBox label="Do you want to proceed?" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Do you want to proceed?" id="1" />, div);
});
