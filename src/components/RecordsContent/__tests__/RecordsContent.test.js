import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import RecordsContent, { RecordsChild } from "..";

import { collectionWithChildHits } from '../../../__fixtures__/collection';
import { childrenCollections, childrenObjects } from '../../../__fixtures__/children';


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
  act(() => {
    render(<RecordsContent
              children={childrenCollections}
              collection={collectionWithChildHits}
              isContentShown={true}
              myListCount={1}
              params={{}}
              preExpanded={[]}
              setActiveRecords={jest.fn()}
              toggleInList={jest.fn()} />, container);
  })

  const recordsContent = document.querySelector(".records__content")
  expect(recordsContent.querySelector(".collection__title").textContent).toBe("Cary Reich papers")

});

it('renders with collection data', () => {
  const child = childrenCollections[Math.floor(Math.random() * childrenCollections.length)]
  act(() => {
    render(<RecordsChild
            item={child}
            myListCount={0}
            params={{query: "foo"}}
            preExpanded={[]}
            setActiveRecords={jest.fn()}
            setIsLoading={jest.fn()}
            toggleInList={jest.fn()}
            />, container);
  })

  const item = document.querySelector(".child__list-item")
  expect(item.textContent).toContain(child.title)
  expect(item.textContent).toContain(child.dates)
  if (child.description) {
    expect(item.textContent).toContain(child.description)
  }
  if (child.hit_count) {
    expect(item.querySelector(".hit-count--records").textContent).toContain(child.hit_count)
  } else {
    expect(item.querySelector(".hit-count--records")).not.toBeInTheDocument()
  }
})

it('renders with object data', () => {
  const child = childrenObjects[Math.floor(Math.random() * childrenObjects.length)]
  act(() => {
    render(<RecordsChild
            item={child}
            myListCount={0}
            params={{query: "foo"}}
            preExpanded={[]}
            setActiveRecords={jest.fn()}
            setIsLoading={jest.fn()}
            toggleInList={jest.fn()}
            />, container);
  })

  const item = document.querySelector(".child__list-item")
  expect(item.textContent).toContain(child.title)
  expect(item.textContent).toContain(child.dates)
  if (child.description) {
    expect(item.textContent).toContain(child.description)
  }
  if (child.hit_count) {
    expect(item.querySelector(".hit-count--records").textContent).toContain(child.hit_count)
  } else {
    expect(item.querySelector(".hit-count--records")).not.toBeInTheDocument()
  }
})

it('handles expand clicks', () => {
  const child = childrenCollections[Math.floor(Math.random() * childrenCollections.length)]
  const setActiveRecords = jest.fn()
  act(() => {
    render(<RecordsChild
            item={child}
            myListCount={0}
            params={{query: "foo"}}
            preExpanded={[]}
            setActiveRecords={setActiveRecords}
            setIsLoading={jest.fn()}
            toggleInList={jest.fn()}
            />, container);
  })

  const button = document.querySelector(".child__title")

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(setActiveRecords).toHaveBeenCalledTimes(1)

})

it('handles list toggle clicks', () => {
  const child = childrenObjects[Math.floor(Math.random() * childrenObjects.length)]
  const toggleInList = jest.fn()
  const setActiveRecords = jest.fn()
  act(() => {
    render(<RecordsChild
            item={child}
            myListCount={0}
            params={{query: "foo"}}
            preExpanded={[]}
            setActiveRecords={setActiveRecords}
            setIsLoading={jest.fn()}
            toggleInList={toggleInList}
            />, container);
  })

  const button = document.querySelector(".btn-add--content")

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  })

  expect(toggleInList).toHaveBeenCalledTimes(1)
  expect(setActiveRecords).toHaveBeenCalledTimes(1)

})
