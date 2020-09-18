import React from "react";
import Skeleton from "react-loading-skeleton";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "./styles.scss";


const PanelTextSection = props => (
  props.text ?
    (<>
      <h3 className="panel__heading">{props.title}</h3>
      <p className="panel__text">{props.text}</p>
    </>) :
    (<>
      <h3 className="panel__heading"><Skeleton /></h3>
      <p className="panel__text"><Skeleton /></p>
    </>)
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
      (<>
        <h3 className="panel__heading"><Skeleton /></h3>
        <ul className="panel__list--unstyled">
          <li><Skeleton /></li>
        </ul>
      </>)
  )

// TODO: add params to back button href
const CollectionDetail = ({ collection }) => {
  /** Helper function to return text from a note by title */
  const noteText = noteTitle => {
    let note = collection.notes && collection.notes.filter(n => {return n.title === noteTitle})[0]
    return note ? note.subnotes.map(s => s.content).join("\r\n") : null
  }

  return (
  <div className="collection__detail">
    <nav>
      <a href="/search" className="btn btn--back"><span className="material-icons">keyboard_arrow_left</span>Back to Search</a>
    </nav>
    <h1 className="collection__title">{collection.title || <Skeleton />}</h1>
    <Accordion className="accordion" preExpanded={["summary"]} allowZeroExpanded={true}>
      <AccordionItem className="accordion__item" uuid="summary">
        <AccordionItemHeading className="accordion__heading" aria-level={2}>
          <AccordionItemButton className="accordion__button">Summary</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="accordion__panel">
          <PanelListSection
            title="Creators"
            listData={collection.creators} />
          <PanelTextSection
            title="Dates"
            text={collection.dates && collection.dates.map(d => d.expression).join(", ")} />
          <PanelTextSection
            title="Description"
            text={noteText("Scope and Contents")} />
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem className="accordion__item" uuid="accessAndUse">
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
      </AccordionItem>
      <AccordionItem className="accordion__item" uuid="relatedTerms">
        <AccordionItemHeading className="accordion__heading" aria-level={2}>
          <AccordionItemButton className="accordion__button">Related Terms</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="accordion__panel">
          <PanelListSection
            title="Subjects"
            listData={collection.terms} />
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  </div>
  )
}

export default CollectionDetail;
