import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import classnames from 'classnames'
import './styles.scss'

class Captcha extends Component {
  constructor (props) {
    super(props)
    this.recaptchaRef = React.createRef()
  }

  /** Reset Recaptcha when form is submitted */
  componentDidUpdate () {
    if (!this.props.form.isValid && this.props.form.isSubmitting) {
      this.recaptchaRef.current.reset()
    }
  }

  render () {
    return (
      <div name='recaptcha' tabIndex='0' className={classnames('captcha', this.props.className)}>
        <ReCAPTCHA
          sitekey='6LdQiSkTAAAAAPsOlHq_QmykPBEF9jdq3qQL_D9a'
          onChange={this.props.handleCaptchaChange}
          ref={this.recaptchaRef} />
      </div>
    )
  }
}

Captcha.propTypes = {
  className: PropTypes.string,
  handleCaptchaChange: PropTypes.func
}

export default Captcha
