import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { messages } from '../../locales/en-pitt/messages'

i18n.load('en-pitt', messages)

i18n.activate('en-pitt')

export const I18nApp = ({ReactComponent}) => {
  return (
    <I18nProvider i18n={i18n}>
      {ReactComponent}
    </I18nProvider>
  );
}