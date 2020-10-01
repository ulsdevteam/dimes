import React from "react";
import { render } from "react-dom";
import ContextSwitcher from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ContextSwitcher
            isContentShown={false}
            toggleIsContentShown={function(){}} />, div);
});
