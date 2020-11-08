import React from "react";
import { render } from "react-dom";
import { HitCountBadge } from ".."


it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<HitCountBadge hitCount={5} />, div);
});
