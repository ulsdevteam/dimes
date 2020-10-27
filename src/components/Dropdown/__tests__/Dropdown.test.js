import React from "react";
import { render } from "react-dom";
import {MyListDropdown, NavDropdown} from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MyListDropdown />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<NavDropdown />, div);
});
