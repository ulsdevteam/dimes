import React from "react";
import { render } from "react-dom";
import Button from "../components/Button";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Button type="submit" handleClick={function(){}} />, div);
});
