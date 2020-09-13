import React from "react";
import { HitCount } from "../Tile";

const CollectionHitsInfo = ({collection}) => (
  <div className="collection-hits__info">
    <h4 className="collection-hits__title">Collection Name:</h4>
    <a className="collection-hits__link" href={collection.uri}>{collection.title}</a>
    <h4 className="collection-hits__title">{collection.creators.length > 1 ? "Creators:" : "Creator:"}</h4>
    {collection.creators.map(c => <a href={c.uri}>{c.title}</a>)}
    <h4 className="collection-hits__title">Dates:</h4>
    <p className="collection-hits__text">{collection.dates.map(d => d.expression).join(", ")}</p>
  </div>
)

const CollectionHits = ({ collection }) => {
  const collectionChildHits = collection.children.map((child, idx) =>
    <div className="collection-child" key={idx}>
      {child.hit_count ? (<HitCount hit_count={child.hit_count} />) : null}
      <h3 className="collection-child__title">{child.title}</h3>
    </div>
  )
  return (
    <>
    <CollectionHitsInfo collection={collection} />
    {collectionChildHits}
    </>
  )
}

export default CollectionHits;
