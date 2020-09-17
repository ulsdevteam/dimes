import React from "react";
import "./styles.scss";

const ObjectDetail = ({ object }) => (
  <div className="object__detail">
    <h1 className="object__title">{object.title}</h1>
  </div>
)

export default ObjectDetail;
