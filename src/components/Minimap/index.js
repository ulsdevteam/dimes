import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { appendParams } from '../Helpers'
import { MinimapSkeleton } from '../LoadingSkeleton'
import './styles.scss'

const Minimap = ({ data, isLoading, params }) => {

  const containerHeight = document.getElementById('minimap') && document.getElementById('minimap').clientHeight
  const containerWidth = document.getElementById('minimap') && document.getElementById('minimap').clientWidth

  const totalBoxes = parseInt(parseInt(containerHeight/13) * parseInt(containerWidth/13))
  const hitsPerBox = data.total / totalBoxes
  /* Create the correct number of blank boxes with start and end indexes */
  const blankBoxes = Array(totalBoxes).fill().map((b, idx) => {
    const startIndex = hitsPerBox * idx
    const endIndex = hitsPerBox * (idx + 1)
    return ({start: startIndex, end: endIndex})
  })

  /* Take blankBoxes and map hits onto them. */
  const minimapBoxes = () => blankBoxes.map((b, idx) => {
    const hits = data.hits && data.hits.filter(h => (h.index <= b.end && b.start < h.index)).sort((a, b) => a.index - b.index)
    const rowClass = hits.filter(h => h.online).length ? 'minimap__digital-hit' : 'minimap__hit'
    const hitTitles = hits.map(h => h.title).join(', ')
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

  return (
    <div id='minimap' className='minimap'>
      {isLoading ? <MinimapSkeleton totalBoxes={totalBoxes} /> : minimapBoxes()}
    </div>
)}

Minimap.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
}

export default Minimap
