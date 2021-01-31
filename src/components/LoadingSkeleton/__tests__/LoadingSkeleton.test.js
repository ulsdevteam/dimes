import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  AgentAttributeSkeleton,
  CollectionHitsChildrenSkeleton,
  CollectionHitsCollectionSkeleton,
  DetailSkeleton,
  FoundInItemSkeleton,
  RecordsChildSkeleton,
  SearchSkeleton,
  MyListSkeleton
} from '..';

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

it('renders without crashing', () => {
  render(<SearchSkeleton />, container);
});

it('renders without crashing', () => {
  render(<MyListSkeleton />, container);
});

it('renders without crashing', () => {
  render(<AgentAttributeSkeleton />, container);
});

it('renders without crashing', () => {
  render(<DetailSkeleton />, container);
});

it('renders without crashing', () => {
  render(<CollectionHitsChildrenSkeleton />, container);
});

it('renders without crashing', () => {
  render(<CollectionHitsCollectionSkeleton />, container);
});

it('renders without crashing', () => {
  render(<FoundInItemSkeleton />, container);
});

it('renders without crashing', () => {
  render(<RecordsChildSkeleton />, container);
});
