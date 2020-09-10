import React from 'react';
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";


const FacetItem = ({ count, handleChange, label }) => (
  <CheckBoxInput
    className="facet__input"
    id={label}
    label={`${label} (${count})`}
    checked={false}
    handleChange={handleChange} />
)

const Facet = ({ children, handleChange, items, title }) => {
  const facetValues = items ?? [];
  const facetItems = facetValues.map((v) =>
     <FacetItem
       key={v.key}
       label={v.key}
       count={v.doc_count}
       handleChange={handleChange} />
  )
  return (
    <div className="facet">
      {title && <h3 className="facet__title">{title}</h3>}
      {children && children}
      {facetItems && facetItems}
    </div>
  )
}

export default Facet;
