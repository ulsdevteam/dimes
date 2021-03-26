import React from 'react'
import './styles.scss'

const SearchNotFound = () => (
  <div className='results__not-found'>
    <p className="results__not-found--text">Have you tried doing the following:</p>
    <ul className="results__not-found--text">
      <li>Check for spelling errors or typos</li>
      <li>Use fewer keywords</li>
      <li>Clear search filter options</li>
    </ul>
    <p className="results__not-found--text">Here are some suggested search terms:</p>
    <ul className="unstyled">
      <li><a className="results__not-found--link" href="#">foobar</a></li>
    </ul>
  </div>
)

export default SearchNotFound
