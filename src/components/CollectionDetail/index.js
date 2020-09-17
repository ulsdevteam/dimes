import React from "react";
import "./styles.scss";

const CollectionDetail = ({ collection }) => (
  <div className="collection__detail">
    <h1 className="collection__title">{collection.title}</h1>
  </div>
)

export default CollectionDetail;
