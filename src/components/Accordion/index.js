import React, { useState } from "react";


const addPropsToChildren = (children, props) => (
  React.Children.map(children, child => {
      if (React.isValidElement(child)) {
          return React.cloneElement(child, props);
      }
      return child;
  })
)

export const Accordion = ({ className, children, preExpanded}) => (
  <div className={className}>
    {addPropsToChildren(children, {preExpanded: preExpanded})}
  </div>
)

export const AccordionItem = ({ className, children, preExpanded, uuid }) => {
  const [isExpanded, setIsExpanded] = useState(preExpanded && preExpanded.includes(uuid) ? true : false)

  return (
    <div className={className}>
      {addPropsToChildren(children, {uuid: uuid, isExpanded: isExpanded, setIsExpanded: setIsExpanded})}
    </div>
  )
}

export const AccordionItemButton = ({ className, children, isExpanded, setIsExpanded, uuid }) => (
  <div className={className}
       id={`accordion__heading-${uuid}`}
       aria-expanded={isExpanded}
       role="button"
       tabIndex="0"
       onClick={() => setIsExpanded(!isExpanded)}>
    {children}
  </div>
)

export const AccordionItemHeading = ({ ariaLevel, className, children, isExpanded, onClick, setIsExpanded, uuid }) => (
  <div aria-level={ariaLevel}
       className={className}
       role="heading"
       onClick={() => onClick && onClick()}>
    {addPropsToChildren(children, { uuid: uuid, isExpanded: isExpanded, setIsExpanded: setIsExpanded })}
  </div>
)

export const AccordionItemPanel = ({ className, children, isExpanded, uuid }) => (
  <div className={className}
       aria-hidden={!isExpanded}
       aria-labelledby={`accordion__heading-${uuid}`}
       id={`accordion__panel-${uuid}`}
       hidden={!isExpanded} >
    {children}
  </div>
)
