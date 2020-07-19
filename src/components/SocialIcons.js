import React, { Component } from "react";
import "./SocialIcons.scss";

class SocialIcons extends Component {
  render() {
    return (
      <div className="rac-social-icons">
        <a href="https://twitter.com/rockarch_org"><i className="fab fa-twitter"></i><span className="visually-hidden">Twitter</span></a>
        <a href="https://www.facebook.com/RockefellerArchiveCenter"><i className="fab fa-facebook-f"></i><span className="visually-hidden">Facebook</span></a>
        <a href="https://www.instagram.com/rockefellerarchivecenter"><i className="fab fa-instagram"></i><span className="visually-hidden">Instagram</span></a>
        <a href="https://www.youtube.com/channel/UCks9ctz4OF9tMNOTrRkWIZg"><i className="fab fa-youtube"></i><span className="visually-hidden">YouTube</span></a>
        <a href="https://www.flickr.com/photos/147074352@N05/"><i>
        <svg width="18px" height="8px" viewBox="0 0 18 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Flickr icon</title>
            <g id="Style-Guide" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Style-Guide-/-Navigation" transform="translate(-1553.000000, -319.000000)" fill="#192E49">
                    <g id="Group-2" transform="translate(1552.999996, 318.500000)">
                        <circle id="Oval" cx="3.9374999" cy="4.41964274" r="3.9374999"></circle>
                        <circle id="Oval-Copy-5" cx="14.0624996" cy="4.41964274" r="3.9374999"></circle>
                    </g>
                </g>
            </g>
        </svg>
        </i><span className="visually-hidden">Flickr</span></a>
      </div>
    )
  }
}

export default SocialIcons;
