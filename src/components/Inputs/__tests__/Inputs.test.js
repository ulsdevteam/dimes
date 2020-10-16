import React from "react";
import { render } from "react-dom";
import {
  CheckBoxInput,
  DatePickerInput,
  SelectInput,
  SelectOption,
  TextInput,
  YearInput } from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CheckBoxInput
    label="Do you want to proceed?"
    id="1" checked={true}
    handleChange={function(){}}/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DatePickerInput label="Select a date" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <SelectInput label="Select an option" id="1">
      <SelectOption label="Foo" />
      <SelectOption label="Bar" />
    </SelectInput>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SelectOption label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<TextInput label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Enter a year" id="1" />, div);
});
