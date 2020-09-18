import React from "react";
import Skeleton from "react-loading-skeleton";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Button from "../Button";
import { DetailSkeleton } from "../LoadingSkeleton";
import "./styles.scss";


const AddButton = ({ className, isSaved, saveItem, item, removeItem, toggleSaved }) => (
  isSaved ? (
    <Button
      className={`${className} saved`}
      label="Remove from List"
      iconAfter="remove_circle_outline"
      handleClick={() => {
        removeItem(item.uri, item.group.identifier);
        toggleSaved(item);
      }} />
  ) : (
    <Button
      className={className}
      label="Add to List"
      iconAfter="add_circle_outline"
      handleClick={() => {
        saveItem(item.uri, item.group.identifier);
        toggleSaved(item);
      }} />
  )
)


const PanelFoundInSection = ({ ancestors }) => (
  ancestors ?
    (<>
      <h3 className="panel__heading">Found In</h3>
      <ul className="found-in">
        {ancestors.reverse().map((item, index) => (
          <li className={(index < 1) ? "found-in__collection" : "found-in__subcollection"} key={index}>
            <a className="found-in__link" href={item.uri}>{item.title}</a>
          </li>
        ))}
      </ul>
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

const PanelTextSection = props => (
  props.text ?
    (<>
      <h3 className="panel__heading">{props.title}</h3>
      <p className="panel__text">{props.text}</p>
    </>) :
    (null)
)

// TODO: add params to back button href
const RecordsDetail = ({ isLoading, isSaved, records, removeItem, saveItem, toggleSaved }) => {
  /** Helper function to return text from a note by title */
  const noteText = noteTitle => {
    let note = records.notes && records.notes.filter(n => {return n.title === noteTitle})[0]
    return note ? note.subnotes.map(s => s.content).join("\r\n") : null
  }

  /** Boolean indicator for the presence of access and use notes */
  const hasAccessAndUse = collection => {
    const access = records.notes && records.notes.filter(n => {return n.title === "Conditions Governing Access"}).length
    const use = records.notes && records.notes.filter(n => {return n.title === "Conditions Governing Use"}).length
    return access || use
  }

  return (
  <div className="records__detail">
    <nav>
      <a href="/search" className="btn btn--back">
        <span className="material-icons">keyboard_arrow_left</span>Back to Search
      </a>
    </nav>
    <h1 className="records__title">{records.title || <Skeleton />}</h1>
    {records.type === "object" ?
      (<AddButton
        className="add-btn--lg"
        isSaved={isSaved}
        item={records}
        removeItem={removeItem}
        saveItem={saveItem}
        toggleSaved={toggleSaved} /> ) :
      (null)
    }
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
                listData={records.creators} />
              <PanelTextSection
                title="Dates"
                text={records.dates && records.dates.map(d => d.expression).join(", ")} />
              <PanelFoundInSection ancestors={records.ancestors} />
              <PanelTextSection
                title="Description"
                text={noteText("Scope and Contents")} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessAndUse(records) ?
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
      { records.terms && records.terms.length ?
        (<AccordionItem className="accordion__item" uuid="relatedTerms">
            <AccordionItemHeading className="accordion__heading" aria-level={2}>
              <AccordionItemButton className="accordion__button">Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordion__panel">
              <PanelListSection
                title="Subjects"
                listData={records.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
  )
}

export default RecordsDetail;
