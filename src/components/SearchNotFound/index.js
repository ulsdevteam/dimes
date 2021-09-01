import React from 'react'
import './styles.scss'


const SuggestionItem = ({text}) => (
  <li>
    <a className="results__not-found--link" href={`/search?query=${text}`}>{text}</a>
  </li>
)

const SearchNotFound = ({suggestions}) => {

  const suggestionList = suggestions && suggestions.map((item, idx) => <SuggestionItem key={idx} text={item} />)

  return (
  <div className='results__not-found'>
    <p className="results__not-found--text">Have you tried doing the following:</p>
    <ul className="results__not-found--text">
      <li>Check for spelling errors or typos</li>
      <li>Use fewer keywords</li>
      <li>Clear search filter options</li>
    </ul>
    {suggestions.length ? (
      <>
        <p className="results__not-found--text">Here are some suggested search terms:</p>
        <ul className="suggestions unstyled">
          {suggestionList}
        </ul>
      </>
    ) : null}
  </div>
)}

export default SearchNotFound
