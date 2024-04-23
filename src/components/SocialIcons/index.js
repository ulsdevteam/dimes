import React from 'react'
import { Trans, t } from '@lingui/macro'

const SocialIcons = () => (
  <Trans comment='Social Icons Titles'>
    <div className='social-icons'>
      <a href={t({
        comment: 'Twitter account link',
        message: 'https://twitter.com/rockarch_org'
      })} aria-label='Twitter'>
        <span className='social-icons__icon'>
          <svg aria-hidden='true' focusable='false' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <title>Twitter Logo</title>
            <path fill='#192E49' d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
          </svg>
        </span>
      </a>
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
        comment: 'Instagram account link',
        message: 'https://www.instagram.com/rockefellerarchivecenter'
      })} aria-label='Instagram'>
        <span className='social-icons__icon'>
          <svg aria-hidden='true' focusable='false' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <title>Instagram Logo</title>
            <path fill='#192E49' d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
          </svg>
        </span>
      </a>
      <a href={t({
        comment: 'Youtube account link',
        message: 'https://www.youtube.com/channel/UCks9ctz4OF9tMNOTrRkWIZg'
      })} aria-label='YouTube'>
        <span className='social-icons__icon'>
        <svg aria-hidden='true' focusable='false' width='24px' height='24px' viewBox='0 0 320 512' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <title>YouTube Logo</title>
            <path fill='#192E49' d='M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5'/>
          </svg>
        </span>
      </a>
      <a href={t({
        comment: 'Flickr account link',
        message: 'https://www.flickr.com/photos/147074352@N05/'
      })} aria-label='Flickr'>
        <span className='social-icons__icon'>
          <svg aria-hidden='true' focusable='false' width='24px' height='24px' viewBox='0 0 320 512' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <title>Flickr Logo</title>
            <path fill='#192E49' d='M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5'/>
          </svg>
        </span>
      </a>
    </div>
  </Trans>
)

export default SocialIcons
