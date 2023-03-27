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
            <Trans comment='Footer.Primary.Title'>
              Rockefeller
              <span className='line-break'>
                  Archive Center
              </span>
            </Trans>
          </h2>
          <div className='footer-primary__address'>
            <p className='footer-primary__text'>
              <Trans id='15 Dayton Avenue' comment='Footer.Primary.CompanyAddress.FirstLine'>
                15 Dayton Avenue<br />
              </Trans>
              <Trans id='Sleeypy Hollow, New York' comment='Footer.Primary.CompanyAddress.SecondLine'>
                Sleepy Hollow, New York
              </Trans>
              <Trans id="10591" comment='Footer.Primary.CompanyAddress.ZipCode'>
                10591
              </Trans>
            </p>
            <p className='footer-primary__text'>
              <Trans comment='Footer.Primary.Company.PhoneNumber'>
                Phone: (914) 366-6300
              </Trans><br />
              <Trans comment='Footer.Primary.Company.FaxNumber'>
                Fax: (914) 631-6017
              </Trans><br />
              <Trans comment='Footer.Primary.Company.Email'>
                E-mail:
                <a className='footer-primary__link' href={
                  t({
                    comment: 'Footer.Primary.Company.Email.href',
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
              <Trans id="Reading Room Hours:" comment='Footer.Primary.ReadingRoomHours'>
                Reading Room Hours:
              </Trans>
            </p>
            <p className='footer-primary__text'>
              <Trans id="Monday-Friday <br /> 10:00am to 5:00pm <br />" comment='Footer.Primary.ReadingRoomHours.Hours'>
                Monday-Friday<br />
                10:00 a.m. to 5:00 p.m.<br />
              </Trans>
              <a className='footer-primary__link' href={
                t({
                  id: 'https://rockarch.org/collections/access-and-request-materials/',
                  comment: 'Footer.Primary.HowTo.href',
                  message: 'https://rockarch.org/collections/access-and-request-materials/'
                })
              }>
                <Trans id='How to access and request materials.' comment='Footer.Primary.HowTo.message'>
                  How to access and request materials.
                </Trans>
              </a>
            </p>
            <a className='footer-primary__link' href={
              t({
                comment: 'Footer.Primary.HolidaySchedule.href',
                message: 'https://rockarch.org/collections/access-and-request-materials/holiday-schedule'
              })
            }>
              <Trans comment='Footer.Primary.HolidaySchedule.message'>
                See holiday schedule
              </Trans>
            </a>
          </div>
          <div className='footer-primary__social'>
            <SocialIcons />
            <p>
              <a className='footer-primary__link footer-primary__policy-link' href={
                t({
                  message: 'https://rockarch.org/about-us/accessibility/',
                  comment: 'Footer.Primary.About.Accessibility.href'
                })
              }>
                <Trans comment='Footer.Primary.About.Accessibility.message'>
                  Accessibility Statement
                </Trans>
              </a>
              <a className='footer-primary__link footer-primary__policy-link' href={
                t({
                  message: 'https://rockarch.org/about-us/privacy-policy/',
                  comment: 'Footer.Primary.About.PrivacyPolicy.href'
                })
              }>
                <Trans comment='Footer.Primary.About.PrivacyPolicy.message'>
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
              <Trans comment='Footer.Primary.Copyright'>
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
                    comment: 'Footer.Secondary.Api.href',
                    message: 'https://docs.rockarch.org/argo-docs/'
                  })
                }>
                  <Trans comment='Footer.Secondary.Api.message'>
                    Collections data API
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    message: 'https://github.com/RockefellerArchiveCenter/data/',
                    comment: 'Footer.Secondary.DataDownload.href'
                  })
                }>
                  <Trans comment='Footer.Secondary.DataDownload.message'>
                    Bulk data download
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    message: 'https://docs.rockarch.org/archival-description-license/',
                    comment: 'Footer.Secondary.License.href'
                  })
                }>
                  <Trans comment='Footer.Secondary.License.message'>
                    Licensing for descriptive metadata
                  </Trans>
                </a>
              </li>
              <li className='footer-secondary__list-item'>
                <a className='footer-secondary__link' href={
                  t({
                    message: 'https://docs.rockarch.org/takedown-policy/',
                    comment: 'Footer.Secondary.TakeDown.href'
                  })
                }>
                  <Trans comment='Footer.Secondary.TakeDown.message'>
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
