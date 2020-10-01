import React from 'react';
import { render } from 'react-dom';
import {
  AgentAttributeSkeleton,
  CollectionHitsSkeleton,
  DetailSkeleton,
  RecordsChildSkeleton,
  SearchSkeleton,
  MyListSkeleton
} from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SearchSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MyListSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<AgentAttributeSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<DetailSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CollectionHitsSkeleton />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<RecordsChildSkeleton />, div);
});
