import React, { Component } from "react";

import SocialIcons from './SocialIcons'

class Footer extends Component {
  render() {
    return (
      <footer className="rac-footer" role="contentinfo">
        <div className="container footer__top">
          <div className="footer__left">
            <h2 className="footer__section title" aria-label="Rockefeller Archive Center Information>Rockefeller<br />Archive Center</h2>
            <div className="footer__section address">
              <p>15 Dayton Avenue<br />
                 Sleepy Hollow, New York 10591</p>
              <p>Phone: (914) 366-6300<br />
                 Fax: (914) 631-6017<br />
                 E-mail: <a href="mailto:archive@rockarch.org">archive@rockarch.org</a></p>
            </div>
            <div className="footer__section reading-room">
              <p>Reading Room Hours:</p>
              <p>Monday-Friday<br />
                 9:00 a.m. to 5:00 p.m.<br />
                 <a href="https://rockarch.org/collections/access-and-request-materials/">By appointment only.</a></p>
              <a href="https://rockarch.org/collections/access-and-request-materials/holiday-schedule/">See holiday schedule</a>
            </div>
          </div>
          <div className="footer__right">
            <div className="footer__section social">
              <SocialIcons />
              <p>
                <a className="policy-link" href="#">Privacy Policy</a>
                <a className="policy-link" href="https://docs.rockarch.org">RAC Policies</a>
              </p>
              <p>Copyright © Rockefeller Archive Center. All rights reserved.</p>
            </div>
          </div>
        </div>
        <div className="container footer__bottom">
          <div className="footer__right">
            <ul>
              <li>Licensing for our descriptive metadata</li>
              <li>Bulk data download</li>
              <li>Take-down policy</li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
