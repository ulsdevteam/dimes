import React from "react";
import PropTypes from "prop-types";
import { CollectionHitsChildrenSkeleton, CollectionHitsCollectionSkeleton } from "../LoadingSkeleton";
import { HitCountButton } from "../HitCount";
import { appendParams } from "../Helpers";
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

const CollectionHits = ({ children, collection, isChildrenLoading, isCollectionLoading, params }) => {
  const collectionChildHits = children && children.map((child, idx) =>
    <div className="collection-child" key={idx}>
      <a href={appendParams(child.uri, params)} className="collection-child__title">{child.title}</a>
      {child.hit_count ? (<HitCountButton className="hit-count--collection-modal" hitCount={child.hit_count} />) : null}
    </div>
  )
  return (
    <>
      {isCollectionLoading ? (<CollectionHitsCollectionSkeleton />) : (<CollectionHitsInfo collection={collection} />)}
      {isChildrenLoading ? (<CollectionHitsChildrenSkeleton />) : (collectionChildHits)}
    </>
  )
}

CollectionHits.propTypes = {
  children: PropTypes.array.isRequired,
  collection: PropTypes.object.isRequired,
  isChildrenLoading: PropTypes.bool.isRequired,
  isCollectionLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
}

export default CollectionHits;
