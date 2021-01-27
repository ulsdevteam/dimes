import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "..";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(<Accordion />, container);
});

it('renders without crashing', () => {
  render(<AccordionItem />, container);
});

it('renders without crashing', () => {
  render(<AccordionItemHeading />, container);
});

it('renders without crashing', () => {
  render(<AccordionItemButton />, container);
});

it('handles clicks', () => {
  const onClick = jest.fn();
  const setIsExpanded = jest.fn();

  act(() => {
    render(<AccordionItemButton setIsExpanded={setIsExpanded} onClick={onClick} />, container);
  })

  const button = document.querySelector("[data-accordion-component=AccordionItemButton]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1)
  expect(setIsExpanded).toHaveBeenCalledTimes(1)
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<AccordionItemPanel />, container);
});
