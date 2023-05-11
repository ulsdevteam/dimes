import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en } from 'make-plural/plurals';
import { messages } from './locales/en/messages'

i18n.loadLocaleData({
	en: { plurals: en }
})

i18n.load('en', messages)

i18n.activate('en')

ReactDOM.render(<I18nProvider i18n={i18n}><App /></I18nProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
