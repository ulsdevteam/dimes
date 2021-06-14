import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { appendParams } from '../Helpers'
import './styles.scss'

const Minimap = ({ data, isLoading, params }) => {

  const containerHeight = document.getElementById('minimap') && document.getElementById('minimap').clientHeight
  const containerWidth = document.getElementById('minimap') && document.getElementById('minimap').clientWidth

  // const rowsFromHits = (hits, digital, params) => hits.map(h => {
  //   const rowClass = digital ? 'minimap__digital-hit' : 'minimap__hit'
  //   const top = h.index * (containerHeight / (data.total + 3)) + 60
  //   return (
  //     <a
  //       key={h.uri}
  //       href={appendParams(h.uri, params)}
  //       className={classnames('minimap__row', rowClass)}
  //       style={{top: `${top}px`}}
  //       title={`Jump to ${h.title}`}
  //       >
  //       <span className='visually-hidden'>{`Jump to ${h.title}`}</span>
  //     </a>
  //   )
  // })

  const totalBoxes = parseInt(parseInt(containerHeight/13) * parseInt(containerWidth/13))
  const hitsPerBox = data.total / totalBoxes
  /* Create the correct number of blank boxes with start and end indexes */
  const blankBoxes = Array(totalBoxes).fill().map((b, idx) => {
    const startIndex = hitsPerBox * idx
    const endIndex = hitsPerBox * (idx + 1)
    return ({start: startIndex, end: endIndex})
  })

  /* Take blankBoxes and map hits onto them.
  // TODO: Handling multiple hits in a single box
   */
  const boxes = () => blankBoxes.map((b, idx) => {
    const hits = data.hits && data.hits.filter(h => (h.index <= b.end && b.start < h.index)).sort((a, b) => a.index - b.index)
    const rowClass = hits.filter(h => h.online).length ? 'minimap__digital-hit' : 'minimap__hit'
    const hitTitles = hits.map(h => h.title).join(', ')
    hits.length && console.log(hits)
    return (
      hits.length ?
      <a
        key={idx}
        href={appendParams(hits[0].uri, params)}
        className={classnames('minimap__box', rowClass)}
        title={`Jump to ${hits.length} ${hits.length === 1 ? 'hit' : 'hits'} in this area: ${hitTitles}`}
        >
        <span className='visually-hidden'>{`Jump to ${hits.length} ${hits.length === 1 ? 'hit' : 'hits'} in this area: ${hitTitles}`}</span>
      </a>
      :
      <div
        key={idx}
        className='minimap__box'
      ></div>
    )
  })

  // const rows = data.hits ? rowsFromHits(data.hits.filter(h => !h.online), false, params) : []
  // const digitalRows = data.hits ? rowsFromHits(data.hits.filter(h => h.online), true, params) : []

  return (
    <div id='minimap' className='minimap'>
      {isLoading ? 'Loading...' : boxes()}
    </div>
)}

Minimap.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
}

export default Minimap
