import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
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
import { dateString, hasAccessAndUse, noteText } from "../Helpers";
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


const PanelFoundInSection = ({ ancestors, params }) => (
  ancestors ?
    (<>
      <h3 className="panel__heading">Found In</h3>
      <ul className="found-in">
        {ancestors.reverse().map((item, index) => (
          <li className={(index < 1) ? "found-in__collection" : "found-in__subcollection"} key={index}>
            <a className="found-in__link" href={`${item.uri}/?${queryString.stringify(params)}`}>{item.title}</a>
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

const RecordsDetail = ({ activeRecords, isContentShown, isLoading, isSaved, removeItem, params, saveItem, toggleSaved }) => (
  <div className={`records__detail ${isContentShown ? "hidden" : ""}`}>
    <nav>
      <a href={`/search?${queryString.stringify(params)}`} className="btn btn--back">
        <span className="material-icons">keyboard_arrow_left</span>Back to Search
      </a>
    </nav>
    <h1 className="records__title">{isLoading ? <Skeleton /> : activeRecords.title }</h1>
    {activeRecords.type === "object" ?
      (<AddButton
        className="btn-add--lg"
        isSaved={isSaved}
        item={activeRecords}
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
                listData={activeRecords.creators} />
              <PanelTextSection
                title="Dates"
                text={dateString(activeRecords.dates)}/>
              <PanelFoundInSection ancestors={activeRecords.ancestors} params={params} />
              <PanelTextSection
                title="Description"
                text={noteText(activeRecords.notes, "Scope and Contents")} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessAndUse(activeRecords.notes) ?
        (<AccordionItem className="accordion__item" uuid="accessAndUse">
          <AccordionItemHeading className="accordion__heading" aria-level={2}>
            <AccordionItemButton className="accordion__button">Access and Use</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="accordion__panel">
            <PanelTextSection
              title="Access"
              text={noteText(activeRecords.notes, "Conditions Governing Access")} />
            <PanelTextSection
              title="Reproduction and Duplication"
              text={noteText(activeRecords.notes, "Conditions Governing Use")} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { activeRecords.terms && activeRecords.terms.length ?
        (<AccordionItem className="accordion__item" uuid="relatedTerms">
            <AccordionItemHeading className="accordion__heading" aria-level={2}>
              <AccordionItemButton className="accordion__button">Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordion__panel">
              <PanelListSection
                title="Subjects"
                listData={activeRecords.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
)

RecordsDetail.propTypes = {
  activeRecords: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  removeItem: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  toggleSaved: PropTypes.func.isRequired
}

export default RecordsDetail;
