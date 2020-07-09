import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../components/Button";

let container = null;
const originalConsoleError = global.console.error

class PropTypesError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "PropTypesError"; // (2)
  }
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed prop type/, /Warning: Received/]

    if (propTypeFailures.some(p => p.test(args[0]))) {
      throw new PropTypesError(args[0])
    }

    originalConsoleError(...args)
  }
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("throws propType errors", () => {
  const a = () => {
    render(<Button label="foo" className="btn" />, container)
  };
  expect(a).toThrow(PropTypesError)

  const b = () => {
    render(<Button buttonType="foo" handleClick={function(){}} />)
  }
  expect(b).toThrow(PropTypesError)
});


it("renders with or without a label", () => {
  act(() => {
    render(<Button label="foo" buttonType="submit" handleClick={function(){}} />, container);
  });
  expect(container.textContent).toBe(" foo");

  act(() => {
    render(<Button buttonType="reset" handleClick={function(){}} />, container);
  });
  expect(container.textContent).toBe(" ");
});
