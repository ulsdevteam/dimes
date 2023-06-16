import React from 'react'
import { render } from 'react-dom'
import { I18nApp } from '../../i18n'
import SocialIcons from '..'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<I18nApp ReactComponent={<SocialIcons />} />, div)
})
