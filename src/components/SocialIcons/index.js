import React from 'react'
import { Trans, t } from '@lingui/macro'

const SocialIcons = () => (
  <Trans comment='Social Icons Titles'>
    <div className='social-icons'>
      <a href={t({
        comment: 'Facebook account link',
        message: 'https://www.facebook.com/RockefellerArchiveCenter'
      })} aria-label='Facebook'>
        <span className='social-icons__icon'>
          <svg aria-hidden='true' focusable='false' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <title>Facebook Logo</title>
            <path fill='#192E49' d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
          </svg>
        </span>
      </a>
      <a href={t({
        comment: 'Instagram account linlinkedin.com/company/rockefeller-archive-center'
      })} aria-label='LinkedIn'>
        <span className='social-icons__icon'>
          <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>LinkedIn Logo</title>
            <path transform="scale(1.5)" fill="#192E49"
              d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
          </svg>
        </span>
      </a>
      <a href={t({
        comment: 'Youtube account link',
        message: 'https://www.youtube.com/channel/UCks9ctz4OF9tMNOTrRkWIZg'
      })} aria-label='YouTube'>
        <span className='social-icons__icon'>
          <svg aria-hidden='true' focusable='false' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <title>YouTube Logo</title>
            <path fill='#192E49' d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
          </svg>
        </span>
      </a>
    </div>
  </Trans>
)

export default SocialIcons
