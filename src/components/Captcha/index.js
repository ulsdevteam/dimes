import React from 'react';
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";

// TODO: replace Captcha key
const Captcha = ({ className, handleCaptchaChange }) => (
  <div name="recaptcha" tabIndex="0" className={`captcha ${className && className}`}>
    <ReCAPTCHA
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      onChange={handleCaptchaChange} />
  </div>
)

Captcha.propTypes = {
  className: PropTypes.string,
  handleCaptchaChange: PropTypes.func
}

export default Captcha;
