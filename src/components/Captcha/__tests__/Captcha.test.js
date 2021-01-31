import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import Captcha from "..";

it('renders props correctly', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const onChange = jest.fn()

  act(() => {
    render(<Captcha className="foo" handleCaptchaChange={onChange} />, div);
  })

  const captcha = document.querySelector("[name=recaptcha]")
  expect(captcha.className).toBe("captcha foo")
});
