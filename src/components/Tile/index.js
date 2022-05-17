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

const Tile = ({ category, className, date, hit_count, online_hit_count, params, title, uri }) => (
  <li className={classnames('tile', className)}>
    <a className='tile__title' href={appendParams(uri, params)}>{title}</a>
    {category ? (<CategoryLabel category={category} />) : null }
    <p className='tile__date'>{date}</p>
    <div className='tile__footer'>
      <Badge className='badge--orange' text={formatMatchString(hit_count)} />
      {online_hit_count ? <Badge className='badge--blue' text={formatMatchString(online_hit_count, true)} /> : null}
    </div>
  </li>)

const TileList = ({ items, params, tileClassName }) => {
  const listItems = items.map(item =>
    <Tile
      key={item.uri}
      {...item}
      params={params}
      className={tileClassName}
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
  params: PropTypes.object,
  tileClassName: PropTypes.string
}

export default TileList
