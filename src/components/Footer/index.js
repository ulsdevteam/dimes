import React from 'react'
import './styles.scss'

const Footer = () => (
  <footer className='footer' role='contentinfo'>
    <div className='footer-primary'>
      <div className='wrapper'>
        <div className='container'>
          <h2 className='footer-primary__title'>Archives &amp; Special Collections <br />University Library System <br />University of Pittsburgh</h2>
          <div className='footer-primary__address'>
            <p className='footer-primary__text'><a href="https://library.pitt.edu/archives-special-collections">About A&SC</a></p>
            <p className='footer-primary__text'><a href="https://library.pitt.edu/ask-archivist">Send us an email</a></p>
          </div>
          <div className='footer-primary__reading-room'>
            <h3 className='footer-primary__subtitle'>Our reading rooms:</h3>
            <p className='footer-primary__text'>
              <strong>A&amp;SC at the Archives Service Center</strong><br />7500 Thomas Boulevard<br />Pittsburgh, PA 15208<br /><a href="tel:+14126483232">412-648-3232</a>
            </p>
            <p className='footer-primary__text'>
              <strong>A&amp;SC at Hillman Library</strong><br />320 Hillman Library<br />University of Pittsburgh<br />3960 Forbes Avenue<br />Pittsburgh, PA 15260<br/ ><a href="tel:+14126488190">412-648-8190</a>
            </p>
            <p className='footer-primary__text'>
              <strong>Center for American Music</strong><br />Stephen Foster Memorial<br />4301 Forbes Ave.<br />Pittsburgh, PA 15260<br /><a href="tel:+14126244100">412-624-4100</a>
            </p>
          </div>
          <div className='footer-primary__social'>
<a href="http://www.facebook.com/pittarchivesandspecialcollections/" name="Archives &amp; Special Collections Facebook"><img alt="Archives &amp; Special Collections Facebook" src="https://library.pitt.edu/sites/default/files/images/SocialMedia/icon_facebook.png" title="Archives &amp; Special Collections Facebook" /></a> <a href="https://pittarchives.tumblr.com/" name="Archives and Manuscripts Tumblr"><img alt="Archives and Manuscripts Tumblr" src="https://library.pitt.edu/sites/default/files/images/SocialMedia/icon_tumblr.png" /></a> <a href="https://instagram.com/pittarchives" name="Archives &amp; Special Collections Instagram"><img alt="Archives Instagram" src="https://library.pitt.edu/sites/default/files/images/SocialMedia/icon_instagram.png" title="Archives &amp; Special Collections Instagram" /></a> <a href="https://pittrarebooks.tumblr.com/" name="Rare Books Tumblr"><img alt="Rare Books Tumblr" src="https://library.pitt.edu/sites/default/files/images/SocialMedia/icon_tumblr.png" title="Rare Books Tumblr" /></a>&nbsp;<a href="https://twitter.com/pittarchives" name="Archives Twitter"><img alt="Archives Twitter" src="https://library.pitt.edu/sites/default/files/images/SocialMedia/icon_twitter.png" title="Archives Twitter" /></a>
          </div>
        </div>
      </div>
    </div>
    <div className='footer-secondary'>
      <div className='wrapper'>
        <div className='container'>
          <div className='footer-secondary__data'>
            <ul className='footer-secondary__list'>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>)

export default Footer
