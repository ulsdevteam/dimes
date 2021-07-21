import React from 'react'
import './styles.scss'

const Footer = () => (
  <footer className='footer' role='contentinfo'>
    <div className='footer-primary'>
      <div className='wrapper'>
        <div className='container'>
          <div className='footer-primary__title'></div>
          <div className='footer-primary__address'>
            <p className='footer-primary__text'></p>
            <p className='footer-primary__text'></p>
          </div>
          <div className='footer-primary__reading-room'>
            <p className='footer-primary__text'></p>
            <p className='footer-primary__text'></p>
          </div>
          <div className='footer-primary__social'>
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
