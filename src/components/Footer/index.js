import React from 'react'
import SocialIcons from '../SocialIcons'

const Footer = () => (
  <footer className='footer' role='contentinfo'>
    <div className='footer-primary'>
      <div className='container'>
        <h2 className='footer-primary__title heading--dotted-border'>Rockefeller <span className='line-break'>Archive Center</span></h2>
        <div className='footer-primary__address'>
          <p className='footer-primary__text'>15 Dayton Avenue<br />
              Sleepy Hollow, New York 10591</p>
          <p className='footer-primary__text'>Phone: (914) 366-6300<br />
              Fax: (914) 631-6017<br />
              E-mail: <a className='footer-primary__link' href='mailto:archive@rockarch.org'>archive@rockarch.org</a></p>
        </div>
        <div className='footer-primary__reading-room'>
          <p className='footer-primary__text'>Reading Room Hours:</p>
          <p className='footer-primary__text'>Monday-Friday<br />
              10:00 a.m. to 5:00 p.m.<br />
            <a className='footer-primary__link' href='https://rockarch.org/collections/access-and-request-materials/'>How to access and request materials</a>.</p>
          <a className='footer-primary__link' href='https://rockarch.org/collections/access-and-request-materials/holiday-schedule/'>See holiday schedule</a>
        </div>
        <div className='footer-primary__social'>
          <SocialIcons />
          <p>
            <a className='footer-primary__link footer-primary__policy-link' href='https://rockarch.org/about-us/privacy-policy/'>Privacy Policy</a>
            <a className='footer-primary__link footer-primary__policy-link' href='https://docs.rockarch.org'>RAC Policies</a>
          </p>
          <p className='footer-primary__text'>Copyright © Rockefeller Archive Center. All rights reserved.</p>
        </div>
      </div>
    </div>
    <div className='footer-secondary'>
      <div className='wrapper'>
        <div className='container'>
          <ul className='footer-secondary__list'>
            <li className='footer-secondary__list-item'>
              <a className='footer-secondary__link' href='https://docs.rockarch.org/argo-docs/'>Collections data API</a>
            </li>
            <li className='footer-secondary__list-item'>
              <a className='footer-secondary__link' href='https://github.com/RockefellerArchiveCenter/data/'>Bulk data download</a>
            </li>
            <li className='footer-secondary__list-item'>
              <a className='footer-secondary__link' href='https://docs.rockarch.org/archival-description-license/'>Licensing for descriptive metadata</a>
            </li>
            <li className='footer-secondary__list-item'>
              <a className='footer-secondary__link' href='https://docs.rockarch.org/takedown-policy/'>Take-down policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>)

export default Footer
