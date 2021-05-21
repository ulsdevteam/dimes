import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { appendParams } from '../Helpers'
import './styles.scss'

const Minimap = ({ data, isLoading, params }) => {

  const containerHeight = document.getElementById('minimap') && document.getElementById('minimap').clientHeight - 60

  const rowsFromHits = (hits, digital, params) => hits.map(h => {
    const rowClass = digital ? 'minimap__digital-hit' : 'minimap__hit'
    const top = h.index * (containerHeight / (data.total + 3)) + 60
    return (
      <a
        key={h.uri}
        href={appendParams(h.uri, params)}
        className={classnames("minimap__row", rowClass)}
        style={{top: `${top}px`}}
        title={`Jump to ${h.title}`}
        >
        <span className='visually-hidden'>{`Jump to ${h.title}`}</span>
      </a>
    )
  })

  const rows = data.hits ? rowsFromHits(data.hits.filter(h => !h.online), false, params) : []
  const digitalRows = data.hits ? rowsFromHits(data.hits.filter(h => h.online), true, params) : []

  return (
    <div id='minimap' className='minimap'>
      {isLoading ? 'Loading...' :
      (digitalRows.concat(rows))}
    </div>
)}

Minimap.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
}

export default Minimap
