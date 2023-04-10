import React from 'react'
import SocialIcons from '../SocialIcons'
import { t, Trans } from '@lingui/macro'
import './styles.scss'

const Footer = () => (
  <footer className='footer' role='contentinfo'>
    <div className='footer-primary'>
      <div className='wrapper'>
        <div className='container'>
          <h2 className='footer-primary__title'>
            <Trans comment='Primary Title'>
              Rockefeller
              <span className='line-break'>
                Archive Center
              </span>
            </Trans>
          </h2>
          <div className='footer-primary__address'>
            <p className='footer-primary__text'>
              <Trans comment='Full Company Address'>
                15 Dayton Avenue
                <br />
                Sleepy Hollow, New York
                <br />
                10591
              </Trans>
            </p>
            <p className='footer-primary__text'>
              <Trans comment='Comapny Phonenumber'>
                Phone: (914) 366-6300
              </Trans><br />
              <Trans comment='Company Fax'>
                Fax: (914) 631-6017
              </Trans><br />
              <Trans comment='Company Email'>
                E-mail:
                <a className='footer-primary__link' href={
                  t({
                    comment: 'Company Email link',
                    message: 'mailto:archive@rockarch.org'
                  })
                }>
                  archive@rockarch.org
                </a>
              </Trans>
            </p>
          </div>
          <div className='footer-primary__reading-room'>
            <p className='footer-primary__text'>
              <Trans comment='Reading Room Hours message'>
                Reading Room Hours:
              </Trans>
            </p>
            <p className='footer-primary__text'>
              <Trans comment='Reading Room Actual Hours'>
                Monday-Friday<br />
                10:00 a.m. to 5:00 p.m.<br />
              </Trans>
              <a className='footer-primary__link' href={
                t({
                  comment: 'Access Materials link',
                  message: 'https://rockarch.org/collections/access-and-request-materials/'
                })
              }>
                <Trans comment='How to Access materials message'>
                  How to access and request materials.
                </Trans>
              </a>
            </p>
            <a className='footer-primary__link' href={
              t({
                comment: 'Holiday Schedule link',
                message: 'https://rockarch.org/collections/access-and-request-materials/holiday-schedule'
              })
            }>
              <Trans comment='Holiday Schedule message'>
                See holiday schedule
              </Trans>
            </a>
          </div>
          <div className='footer-primary__social'>
            <SocialIcons />
            <p>
              <a className='footer-primary__link footer-primary__policy-link' href={
                t({
                  comment: 'Accessibility Statement Link',
                  message: 'https://rockarch.org/about-us/accessibility/'
                })
              }>
                <Trans comment='Accessibility Statement message'>
                  Accessibility Statement
                </Trans>
              </a>
              <a className='footer-primary__link footer-primary__policy-link' href={
                t({
                  comment: 'Privacy Policy link',
                  message: 'https://rockarch.org/about-us/privacy-policy/'
                })
              }>
                <Trans comment='Privacy Policy message'>
                  Privacy Policy
                </Trans>
              </a>
              <a className='footer-primary__link footer-primary__policy-link' href={
                t({
                  message: 'https://docs.rockarch.org',
                  comment: 'Footer.Primary.RAC.href'
                })
              }>
                <Trans comment='Footer.Primary.RAC.message'>
                  RAC Policies
                </Trans>
              </a>
            </p>
            <p className='footer-primary__text'>
              <Trans comment='Copyright message'>
                Copyright © Rockefeller Archive Center. All rights reserved.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='footer-secondary'>
      <div className='wrapper'>
        <div className='container'>
          <div className='footer-secondary__data'>
            <ul className='footer-secondary__list'>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    comment: 'Collections data API link',
                    message: 'https://docs.rockarch.org/argo-docs/'
                  })
                }>
                  <Trans comment='Collections data API message'>
                    Collections data API
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    comment: 'Bulk Data Download link',
                    message: 'https://github.com/RockefellerArchiveCenter/data/'
                  })
                }>
                  <Trans comment='Bulk Data Download message'>
                    Bulk data download
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    comment: 'Licensing link',
                    message: 'https://docs.rockarch.org/archival-description-license/'
                  })
                }>
                  <Trans comment='Licensing message'>
                    Licensing for descriptive metadata
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    comment: 'Take-down Policy link',
                    message: 'https://docs.rockarch.org/takedown-policy/'
                  })
                }>
                  <Trans comment='Take-down Policy message'>
                    Take-down policy
                  </Trans>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>)

export default Footer
