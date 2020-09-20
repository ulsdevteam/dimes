import React from "react";
import PropTypes from "prop-types";
import { CollectionHitsSkeleton } from "../LoadingSkeleton";
import { HitCount } from "../Tile";
import "./styles.scss"

const CollectionHitsInfo = ({ collection }) => (
   <div className="collection-hits__info">
     <h3 className="collection-hits__title">Collection Name:</h3>
     <a className="collection-hits__link" href={collection.uri}>{collection.title}</a>
     <h3 className="collection-hits__title">{collection.creators && collection.creators.length > 1 ? "Creators:" : "Creator:"}</h3>
     {collection.creators && collection.creators.map(c => <a key={c.uri} className="collection-hits__link" href={c.uri}>{c.title}</a>)}
     <h3 className="collection-hits__title">Dates:</h3>
     <p className="collection-hits__text">{collection.dates && collection.dates.map(d => d.expression).join(", ")}</p>
   </div>
)

CollectionHitsInfo.propTypes = {
  collection: PropTypes.object.isRequired
}

const CollectionHits = ({ collection, isLoading }) => {
  const collectionChildHits = collection.children && collection.children.map((child, idx) =>
    <div className="collection-child" key={idx}>
      {child.hit_count ? (<HitCount hit_count={child.hit_count} />) : null}
      <a href={child.uri} className="collection-child__title">{child.title}</a>
    </div>
  )
  return (
    isLoading ?
    (<CollectionHitsSkeleton />) :
    (<>
      <CollectionHitsInfo collection={collection} />
      {collectionChildHits}
    </>)
  )
}

CollectionHits.propTypes = {
  collection: PropTypes.object.isRequired
}

export default CollectionHits;
