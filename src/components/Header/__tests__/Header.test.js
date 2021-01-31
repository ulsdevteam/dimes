import React from 'react';
import {render} from 'react-dom';
import { act } from 'react-dom/test-utils';
import Header from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  act(() => {
    render(<Header myListCount={4} />, div);
  })

  list = document.querySelector("#list");
  expect(list.textContent).toBe("My List (4) arrow_right_alt")

});
