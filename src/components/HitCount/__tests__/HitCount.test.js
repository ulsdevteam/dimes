import React from "react";
import { render } from "react-dom";
import HitCount from ".."


it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<HitCount hitCount={5} />, div);
});
