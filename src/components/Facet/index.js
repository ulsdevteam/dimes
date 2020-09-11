import React from 'react';
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";


const FacetItem = ({ checked, count, handleChange, label, paramKey }) => (
  <CheckBoxInput
    className="facet__input"
    id={label}
    label={`${label} (${count})`}
    checked={checked}
    handleChange={e => handleChange(e, paramKey)} />
)

const Facet = ({ children, handleChange, items, paramKey, params, title }) => {
  const facetValues = items ?? [];
  const isChecked = key => {
    if (Array.isArray(params)) {
      return params.includes(key)
    } else {
      return params === key
    }
  }
  const facetItems = facetValues.map((v) =>
     <FacetItem
       key={v.key}
       label={v.key}
       checked={isChecked(v.key)}
       count={v.doc_count}
       paramKey={paramKey}
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
