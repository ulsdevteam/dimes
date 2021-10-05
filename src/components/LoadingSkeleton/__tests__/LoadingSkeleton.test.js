import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {
  AgentAttributeSkeleton,
  DetailSkeleton,
  FoundInItemSkeleton,
  MinimapSkeleton,
  RecordsChildSkeleton,
  RestrictionsSkeleton,
  SearchSkeleton,
  MyListSkeleton
} from '..'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('renders without crashing', () => {
  render(<SearchSkeleton />, container)
})

it('renders without crashing', () => {
  render(<MyListSkeleton />, container)
})

it('renders without crashing', () => {
  render(<AgentAttributeSkeleton />, container)
})

it('renders without crashing', () => {
  render(<DetailSkeleton />, container)
})

it('renders without crashing', () => {
  render(<FoundInItemSkeleton />, container)
})

it('renders without crashing', () => {
  render(<RecordsChildSkeleton />, container)
})

it('renders without crashing', () => {
  render(<RestrictionsSkeleton />, container)
})

it('renders without crashing', () => {
  render(<MinimapSkeleton totalBoxes={184} />, container)
})
