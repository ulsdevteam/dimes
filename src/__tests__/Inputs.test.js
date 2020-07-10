import React from "react";
import { render } from "react-dom";
import { CheckBox, DatePicker, RadioGroup, RadioInput, YearInput } from "../components/Inputs";

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
  render(<RadioGroup label="Select an option" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RadioInput label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Enter a year" id="1" />, div);
});
