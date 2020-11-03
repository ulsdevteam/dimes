import React from "react";
import { render } from "react-dom";
import {
  CheckBoxInput,
  DateInput,
  SelectInput,
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
  render(<DateInput label="Select a date" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const options = [
    {value: "", label: "select a value"},
    {value: "foo", label: "Foo"},
    {value: "bar", label: "Bar"},
  ]
  render(
    <SelectInput
      className="foo"
      id="foo"
      label="Select an option"
      onChange={function(){}}
      options={options} />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<TextInput label="Foo" id="1" />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<YearInput label="Enter a year" id="1" />, div);
});
