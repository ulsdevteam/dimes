import React from "react";
import { render } from "react-dom";
import { CheckBox, DatePicker, YearInput } from "../components/Inputs";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CheckBox label="Do you want to proceed?" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DatePicker label="Select a date" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Enter a year" id="1" />, div);
});
