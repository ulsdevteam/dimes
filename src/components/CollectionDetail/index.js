import React from "react";
import Skeleton from "react-loading-skeleton";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { DetailSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


const PanelTextSection = props => (
  props.text ?
    (<>
      <h3 className="panel__heading">{props.title}</h3>
      <p className="panel__text">{props.text}</p>
    </>) :
    (null)
)

const PanelListSection = props =>  (
    props.listData ?
      (<>
        <h3 className="panel__heading">{props.title}</h3>
        <ul className="panel__list--unstyled">
          {props.listData.map((item, index) => (
          <li key={index} className="panel__text">{item.title}</li>))}
        </ul>
      </>) :
      (null)
  )

// TODO: add params to back button href
const CollectionDetail = ({ collection, isLoading }) => {
  /** Helper function to return text from a note by title */
  const noteText = noteTitle => {
    let note = collection.notes && collection.notes.filter(n => {return n.title === noteTitle})[0]
    return note ? note.subnotes.map(s => s.content).join("\r\n") : null
  }

  /** Boolean indicator for the presence of access and use notes */
  const hasAccessAndUse = collection => {
    const access = collection.notes && collection.notes.filter(n => {return n.title === "Conditions Governing Access"}).length
    const use = collection.notes && collection.notes.filter(n => {return n.title === "Conditions Governing Use"}).length
    return access || use
  }

  return (
  <div className="collection__detail">
    <nav>
      <a href="/search" className="btn btn--back">
        <span className="material-icons">keyboard_arrow_left</span>Back to Search
      </a>
    </nav>
    <h1 className="collection__title">{collection.title || <Skeleton />}</h1>
    <Accordion className="accordion" preExpanded={["summary"]} allowZeroExpanded={true}>
      <AccordionItem className="accordion__item" uuid="summary">
        <AccordionItemHeading className="accordion__heading" aria-level={2}>
          <AccordionItemButton className="accordion__button">Summary</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="accordion__panel">
          {isLoading ?
            (<DetailSkeleton />) :
            (<>
              <PanelListSection
              title="Creators"
              listData={collection.creators} />
              <PanelTextSection
                title="Dates"
                text={collection.dates && collection.dates.map(d => d.expression).join(", ")} />
              <PanelTextSection
                title="Description"
                text={noteText("Scope and Contents")} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessAndUse(collection) ?
        (<AccordionItem className="accordion__item" uuid="accessAndUse">
          <AccordionItemHeading className="accordion__heading" aria-level={2}>
            <AccordionItemButton className="accordion__button">Access and Use</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="accordion__panel">
            <PanelTextSection
              title="Access"
              text={noteText("Conditions Governing Access")} />
            <PanelTextSection
              title="Reproduction and Duplication"
              text={noteText("Conditions Governing Use")} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { collection.terms && collection.terms.length ?
        (<AccordionItem className="accordion__item" uuid="relatedTerms">
            <AccordionItemHeading className="accordion__heading" aria-level={2}>
              <AccordionItemButton className="accordion__button">Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordion__panel">
              <PanelListSection
                title="Subjects"
                listData={collection.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
  )
}

export default CollectionDetail;
