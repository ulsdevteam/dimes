import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { appendParams } from '../Helpers'
import { MinimapSkeleton } from '../LoadingSkeleton'
import './styles.scss'

/**
* Minimap component
* 1. Uses a callback component so container height and width are set once ref resolves.
* 2. Create the correct number of blank boxes with start and end indexes.
* 3. Map hits onto blankBoxes array.
**/
const Minimap = ({ data, isLoading, params, rowCount=4 }) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const minimapContainer = useCallback(node => { /* 1 */
    if (node !== null) {
      setContainerHeight(node.getBoundingClientRect().height);
      setContainerWidth(node.getBoundingClientRect().width)
    }
  }, []);

  const boxWidthHeight = containerWidth / rowCount
  const totalBoxes = containerHeight && boxWidthHeight ? parseInt(parseInt(containerHeight) / boxWidthHeight) * rowCount : 0
  const hitsPerBox = data.total / totalBoxes

  const blankBoxes = Array(totalBoxes).fill().map((b, idx) => { /* 2 */
    const startIndex = hitsPerBox * idx
    const endIndex = hitsPerBox * (idx + 1)
    return ({start: startIndex, end: endIndex})
  })

  /* Gets the best URL for a minimap area */
  const getAreaUrl = (areaHits) => (
    areaHits.find(h => h.uri.includes("objects")) ? areaHits.find(h => h.uri.includes("objects")).uri : areaHits[0].uri
  )

  const minimapBoxes = () => blankBoxes.map((b, idx) => {  /* 3 */
    const areaHits = data.hits && data.hits.filter(h => (h.index <= b.end && b.start < h.index)).sort((a, b) => a.index - b.index)
    const hitClass = areaHits.filter(h => h.online).length ? 'minimap__digital-hit' : 'minimap__record-hit'
    const hitTitles = areaHits.map(h => h.title).join('\n')
    const currentUrl = window.location.pathname
    const areaUrl = areaHits.length && getAreaUrl(areaHits)
    const isAreaActive = areaUrl === currentUrl
    return (
      areaHits.length ?
      <a
        key={idx}
        href={appendParams(areaUrl, params)}
        className={classnames('minimap__box', hitClass, { [`${hitClass}--active`] : isAreaActive})}
        title={`Jump to ${areaHits.length} ${areaHits.length === 1 ? 'hit' : 'hits'} in this area: ${hitTitles}`} >
        <span className='visually-hidden'>{`Jump to ${areaHits.length} ${areaHits.length === 1 ? 'hit' : 'hits'} in this area: ${hitTitles}`}</span>
        <span className="material-icons" aria-hidden="true">check</span>
      </a>
      :
      <div
        key={idx}
        className='minimap__box'>
    </div>
    )
  })

  return (
    <>
      <h2 className="visually-hidden">Minimap</h2>
      <nav className={classnames('minimap', `minimap--${rowCount}-across` )} ref={minimapContainer} aria-label="Minimap">
        {isLoading ? <MinimapSkeleton totalBoxes={totalBoxes} /> : minimapBoxes()}
      </nav>
    </>
)}

Minimap.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  rowCount: PropTypes.number,
}

export default Minimap
