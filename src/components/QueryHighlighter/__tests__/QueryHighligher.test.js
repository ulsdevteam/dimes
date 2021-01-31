import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import QueryHighlighter from '..';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders props correctly', () => {
  act(() => {
    render(<QueryHighlighter query="foo" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("foo")
});

it('renders props correctly', () => {
  act(() => {
    render(<QueryHighlighter query="bar baz" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("bar")

});

it('renders props correctly', () => {
  act(() => {
    render(<QueryHighlighter query="foo baz" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("foo")

});
