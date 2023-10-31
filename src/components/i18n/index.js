import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { messages } from '../../locales/en/messages'
import { messages as cnMessages } from '../../locales/cn/messages'
import { messages as deMessages } from '../../locales/de/messages'
import { messages as enMessages } from '../../locales/en/messages'
import { messages as esMessages } from '../../locales/es/messages'
import { messages as frMessages } from '../../locales/fr/messages'
import { messages as itMessages } from '../../locales/it/messages'
import { messages as jaMessages } from '../../locales/ja/messages'
import { messages as koMessages } from '../../locales/ko/messages'
import { messages as ptMessages } from '../../locales/pt/messages'
import { messages as trMessages } from '../../locales/tr/messages'

i18n.load({
  cn: cnMessages,
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
  ja: jaMessages,
  ko: koMessages,
  pt: ptMessages,
  tr: trMessages,
});

i18n.activate('en')

export const I18nApp = ({ReactComponent}) => {
  return (
    <I18nProvider i18n={i18n}>
      {ReactComponent}
    </I18nProvider>
  );
}
