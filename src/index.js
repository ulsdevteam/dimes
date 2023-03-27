import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { defaultLocale, dynamicActivate, locales } from './components/i18n';

import * as serviceWorker from './serviceWorker';


const I18nApp = () => {
  const [loading, setLoading] = useState(true)
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    setLocale(window.localStorage.getItem('locale'))
  }, []);

  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(locale, loading, setLocale, setLoading)
    window.localStorage.setItem('locale', locale)
  }, [locale])
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <I18nProvider i18n={i18n}>
      <App locales={locales} onLanguageChange={setLocale} locale={locale} />
    </I18nProvider>
  );
}

ReactDOM.render(
        <I18nApp />,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
