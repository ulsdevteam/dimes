import React from "react";
import { HitCount } from "../Tile";
import "./styles.scss"

const CollectionHitsInfo = ({collection}) => (
  <div className="collection-hits__info">
    <h3 className="collection-hits__title">Collection Name:</h3>
    <a className="collection-hits__link" href={collection.uri}>{collection.title}</a>
    <h3 className="collection-hits__title">{collection.creators.length > 1 ? "Creators:" : "Creator:"}</h3>
    {collection.creators.map(c => <a className="collection-hits__link" href={c.uri}>{c.title}</a>)}
    <h3 className="collection-hits__title">Dates:</h3>
    <p className="collection-hits__text">{collection.dates.map(d => d.expression).join(", ")}</p>
  </div>
)

const CollectionHits = ({ collection }) => {
  const collectionChildHits = collection.children.map((child, idx) =>
    <div className="collection-child" key={idx}>
      {child.hit_count ? (<HitCount hit_count={child.hit_count} />) : null}
      <a href={child.uri} className="collection-child__title">{child.title}</a>
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
