import React, {useState} from 'react';
import { CheckBoxInput } from "../Inputs";
import "./styles.scss";


const ShowHideMore = ({id, isOpen, toggleOpen}) => {
  return (
    <a className="facet__show-hide" onClick={() => toggleOpen(isOpen)} >{isOpen ? "show less" : "show all"}</a>
  )
}

const FacetItem = ({ checked, count, handleChange, label, paramKey }) => (
  <CheckBoxInput
    className="facet__input"
    id={label}
    label={`${label} (${count})`}
    checked={checked}
    handleChange={e => handleChange(e, paramKey)} />
)

const Facet = ({ children, handleChange, items, paramKey, params, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = isOpen => {
    setIsOpen(!isOpen)
  }
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
      {facetItems && <div className={`facet__items${isOpen ? " open": ""}`}>{facetItems}</div>}
      {facetItems.length > 5 && <ShowHideMore id={paramKey} isOpen={isOpen} toggleOpen={toggleOpen} />}
    </div>
  )
}

export default Facet;
