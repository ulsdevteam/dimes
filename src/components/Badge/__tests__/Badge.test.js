import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import Badge from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  act(() => {
    ReactDOM.render(<Badge label="This is a badge" />, div);
  })

  const badge = document.querySelector("span");
  expect(badge.textContent).toContain("This is a badge")

  act(() => {
    ReactDOM.render(<Badge className="foo" icon="bar" label="This is a badge" />, div);
  })

  expect(badge.className).toBe("foo")
  expect(badge.textContent).toContain("bar")
  expect(badge.textContent).toContain("This is a badge")

});
