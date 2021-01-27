import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from "react-dom/test-utils";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Accordion />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccordionItem />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccordionItemHeading />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccordionItemButton />, div);
});

it('handles clicks', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const onClick = jest.fn();
  const setIsExpanded = jest.fn();

  act(() => {
    ReactDOM.render(<AccordionItemButton setIsExpanded={setIsExpanded} onClick={onClick} />, div);
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
  ReactDOM.render(<AccordionItemPanel />, div);
});
