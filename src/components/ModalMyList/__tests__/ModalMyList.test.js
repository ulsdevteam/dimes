import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  DuplicationRequestModal,
  EmailModal,
  ModalMyList,
  ReadingRoomRequestModal
} from '..';

import { checkedList } from '../../../__fixtures__/checkedList';
import { resolvedList } from '../../../__fixtures__/resolvedList';
import { submitList } from '../../../__fixtures__/submitList';


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

it('renders correctly', () => {
  act(() => {
    render(<ModalMyList
        appElement={container}
        handleChange={jest.fn()}
        ignoreRestrictions={true}
        isOpen={true}
        list={resolvedList}
        setSubmit={jest.fn()}
        title="foo"
        toggleModal={jest.fn()} />, container);
  })

  const selectButton = document.querySelector(".modal-list > button")
  const title = document.querySelector(".modal-header__title")
  const totals = document.querySelector(".selected-totals")
  expect(selectButton.textContent).toContain("Select all items")
  expect(title.textContent).toBe("foo")
  expect(totals.textContent).toBe("selected: 0 items")

  act(() => {
    render(<ModalMyList
        appElement={container}
        handleChange={jest.fn()}
        ignoreRestrictions={true}
        isOpen={true}
        list={checkedList}
        setSubmit={jest.fn()}
        title="foo"
        toggleModal={jest.fn()} />, container);
  })

  expect(selectButton.textContent).toContain("Deselect all items")
  expect(totals.textContent).toBe("selected: 2 audio tapes, 9 folders")
});

it('renders without crashing', () => {
  act(() => {
    render(<EmailModal
        appElement={container}
        handleChange={jest.fn()}
        handleFormSubmit={jest.fn()}
        isOpen={true}
        list={resolvedList}
        setSubmit={jest.fn()}
        submitList={submitList}
        toggleList={jest.fn()}
        toggleModal={jest.fn()} />, container);
  })
});

it('renders without crashing', () => {
  render(<ReadingRoomRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      isOpen={false}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container);
});

it('renders without crashing', () => {
  render(<DuplicationRequestModal
      appElement={container}
      handleChange={jest.fn()}
      handleFormSubmit={jest.fn()}
      isOpen={false}
      list={resolvedList}
      setSubmit={jest.fn()}
      submitList={submitList}
      toggleList={jest.fn()}
      toggleModal={jest.fn()} />, container);
});
