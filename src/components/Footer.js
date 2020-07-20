import React, { Component } from "react";
import SocialIcons from "./SocialIcons";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="rac-footer" role="contentinfo">
        <div className="primary">
          <div className="container">
            <h2 className="title" aria-label="Rockefeller Archive Center Information">Rockefeller<br />Archive Center</h2>
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
        <div className="secondary">
          <div className="container">
            <div className="footer__section data">
              <ul>
                <li><a href="https://github.com/RockefellerArchiveCenter/data/blob/master/LICENSE.md">Licensing for our descriptive metadata</a></li> {/*TODO: should this be on the docs site?*/}
                <li><a href="https://github.com/RockefellerArchiveCenter/data/">Bulk data download</a></li>
                <li><a href="#">Take-down policy</a></li> {/*TODO: add take-down policy*/}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
