import React, { useEffect, useState } from "react";
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
import ListToggleButton from "../ListToggleButton";
import { DetailSkeleton, FoundInItemSkeleton } from "../LoadingSkeleton";
import { dateString, hasAccessAndUse, noteText } from "../Helpers";
import { fetchMyList, isItemSaved, removeItem, saveItem } from "../MyListHelpers";
import "./styles.scss";


const FoundInItem = ({ className, item }) => (
  <>
    <li className={className}>
      <a className="found-in__link" href={item.uri}>{item.title}</a>
    </li>
    {item.child ? (<FoundInItem item={item.child} className="found-in__subcollection" />) : null}
  </>
)

const PanelFoundInSection = ({ ancestors, isLoading }) => (
  ancestors.title ?
    (<>
      <h3 className="panel__heading">Found In</h3>
      <ul className="found-in">
      {isLoading ?
        (<FoundInItemSkeleton/>) :
        (<FoundInItem item={ancestors} className="found-in__collection" />)}
      </ul>
    </>) :
    (null)
)

const PanelListSection = ({ listData, title }) =>  (
  listData ?
    (<>
      <h3 className="panel__heading">{title}</h3>
      <ul className="panel__list--unstyled">
        {listData.map((item, index) => (
        <li key={index} className="panel__text">{item.title}</li>))}
      </ul>
    </>) :
    (null)
)

const PanelTextSection = ({ text, title }) => (
  text ?
    (<>
      <h3 className="panel__heading">{title}</h3>
      <p className="panel__text">{text}</p>
    </>) :
    (null)
)

const RecordsDetail = ({ activeRecords, ancestors, isAncestorsLoading, isContentShown, isLoading, params }) => {

  var [isSaved, setIsSaved] = useState(() => {
    const list = fetchMyList();
    return !isLoading && isItemSaved(activeRecords, list)
  })

  useEffect(() => {
    const list = fetchMyList();
    const saved = !isLoading && isItemSaved(activeRecords, list)
    setIsSaved(saved)
  }, [isLoading, activeRecords])

  const toggleSaved = item => {
    const list = fetchMyList();
    const saved = isItemSaved(item, list)
    saved ? removeItem(item) : saveItem(item)
    setIsSaved(!saved)
  }

  return (
  <div className={`records__detail ${isContentShown ? "hidden" : ""}`}>
    <nav>
      <a href={`/search?${queryString.stringify(params)}`} className="btn btn--back">
        <span className="material-icons">keyboard_arrow_left</span>Back to Search
      </a>
    </nav>
    <h1 className="records__title">{isLoading ? <Skeleton /> : activeRecords.title }</h1>
    {activeRecords.type === "object" ?
      (<ListToggleButton
        className="btn-add--lg"
        isSaved={isSaved}
        item={activeRecords}
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
                text={dateString(activeRecords.dates)} />
              <PanelFoundInSection
                ancestors={ancestors}
                isLoading={isAncestorsLoading} />
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
)}

RecordsDetail.propTypes = {
  activeRecords: PropTypes.object.isRequired,
  ancestors: PropTypes.object.isRequired,
  isAncestorsLoading: PropTypes.bool.isRequired,
  isContentShown: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
}

export default RecordsDetail;
