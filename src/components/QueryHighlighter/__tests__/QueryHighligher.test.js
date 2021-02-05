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

it('finds word at beginning', () => {
  act(() => {
    render(<QueryHighlighter query="foo" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("foo")
});

it('finds word in middle', () => {
  act(() => {
    render(<QueryHighlighter query="bar baz" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("bar")

});

it('finds phrase', () => {
  act(() => {
    render(<QueryHighlighter query="foo bar" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("foo")

});

it('finds phrase separated by another word', () => {
  act(() => {
    render(<QueryHighlighter query="foo baz" text="foo bar baz" />, container);
  })

  const highlight = document.querySelector(".query-highlight")
  expect(highlight.textContent).toBe("foo")

});
