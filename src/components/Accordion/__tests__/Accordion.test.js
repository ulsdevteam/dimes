import React from 'react';
import ReactDOM from 'react-dom';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccordionItemPanel />, div);
});
