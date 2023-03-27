import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { en, fr, de } from 'make-plural/plurals';

export const locales = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' }
];

export const defaultLocale = 'en'

export const defaultMessages = import(`../../locales/${defaultLocale}/messages`)

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
})

  /**
  * We do a dynamic import of just the catalog that we need
  * @param locale any locale string
  */
export async function dynamicActivate(locale, loading, setLocale, setLoading) {
  if (locale !== defaultLocale) {
    try {
      const { messages } = await import(`../../locales/${locale}/messages`)
      i18n.load(locale, messages)
    } catch (e) {
      console.log(locale + " does not seem to be a valid locale.")
      console.log("Reverting back to the default locale: " + defaultLocale)
      setLocale(defaultLocale)
    }
  } else {
    i18n.load(locale, defaultMessages)
  }
  i18n.activate(locale)
  if (loading) {
    setLoading(!loading);
  }
}