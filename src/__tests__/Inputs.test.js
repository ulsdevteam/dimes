import React from "react";
import { render } from "react-dom";
import {
  CheckBoxInput,
  DatePickerInput,
  RadioGroup,
  RadioInput,
  SelectInput,
  SelectOption,
  TextAreaInput,
  TextInput,
  YearInput } from "../components/Inputs";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CheckBoxInput label="Do you want to proceed?" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DatePickerInput label="Select a date" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <RadioGroup label="Select an option">
      <RadioInput label="Foo" id="1" />
      <RadioInput label="Bar" id="2" />
    </RadioGroup>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RadioInput label="Foo" id="1" />, div);
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
  render(<TextAreaInput label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<TextInput label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Enter a year" id="1" />, div);
});
