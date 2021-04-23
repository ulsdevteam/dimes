import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from '../Badge'
import MaterialIcon from '../MaterialIcon'
import { appendParams, formatMatchString } from '../Helpers'
import classnames from 'classnames'
import './styles.scss'

const CategoryLabel = ({ category }) => {
  var icon = ''
  switch (category) {
    case 'person':
      icon = 'person'
      break
    case 'organization':
      icon = 'account_balance'
      break
    default:
      icon = 'archive_box'
  }
  return (
    <div className={classnames('tile__type-label', category)}><MaterialIcon icon={icon} />{category}</div>
  )
}

const Tile = ({ category, date, hit_count, params, title, uri }) => (
  <li className='tile'>
    <a className='tile__title' href={appendParams(uri, params)}>{title}</a>
    {category ? (<CategoryLabel category={category} />) : null }
    {hit_count && category === 'collection' ?
      (<Badge className='badge--tile' text={formatMatchString(hit_count)} />) :
      (null)
    }
    <p className='tile__date'>{date}</p>
  </li>)

const TileList = ({ items, params }) => {
  const listItems = items.map(item =>
    <Tile
      key={item.uri}
      {...item}
      params={params}
      date={item.dates?.length ? item.dates.map(d => d.expression).join(', ') : null} />
  )
  return (
    <ul className='tile-list'>
      {listItems}
    </ul>
  )
}

TileList.propTypes = {
  items: PropTypes.array.isRequired,
  params: PropTypes.object
}

export default TileList
