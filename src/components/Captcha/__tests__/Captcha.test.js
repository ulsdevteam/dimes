import React from "react";
import { render } from "react-dom";
import Captcha from "..";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Captcha className="foo", handleCaptchaChange={function() {}} />, div);
});
