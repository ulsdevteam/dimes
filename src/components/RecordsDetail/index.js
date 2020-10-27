import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Button from "../Button";
import ListToggleButton from "../ListToggleButton";
import MaterialIcon from "../MaterialIcon";
import QueryHighlighter from "../QueryHighlighter";
import { DetailSkeleton, FoundInItemSkeleton } from "../LoadingSkeleton";
import { appendParams, dateString, hasAccessAndUse, noteText } from "../Helpers";
import { isItemSaved } from "../MyListHelpers";
import classnames from "classnames";
import "./styles.scss";


const FoundInItem = ({ className, item, params, topLevel }) => (
  <>
    <li className={className}>
      <MaterialIcon icon={topLevel ? "archive_box" : "subdirectory_arrow_right"} />
      <a className="found-in__link" href={appendParams(item.uri, params)}>{item.title}</a>
    </li>
    {item.child ?
      (<FoundInItem
        item={item.child}
        className="found-in__subcollection"
        params={params} />) :
      (null)}
  </>
)

const PanelExtentSection = ({ extents }) => (
  extents ? (
  <div className="panel__section">
    <h3 className="panel__heading">Size</h3>
    <ul className="panel__list--unstyled">
      {extents.map((e, index) => (
      <li key={index} className="panel__text">{`${e.value} ${e.type.replace("_", " ")}`}</li>))}
    </ul>
  </div>) :
  (null)
)

const PanelFormatSection = ({ formats, notes }) => {
  const displayFormats = formats.filter(f => (
    f !== "documents"
  ))
  const formatText = []
  formatText.push(noteText(notes, "physdesc"))
  formatText.push(noteText(notes, "materialspec"))
  const filteredFormatText = formatText.filter(i => (i != null))
  return (
    displayFormats.length ? (
      <div className="panel__section">
        <h3 className="panel__heading">Formats</h3>
        <ul className="panel__list--unstyled">
          {filteredFormatText.length ?
            (<li className="panel__text">{filteredFormatText.join("\n")}</li>) :
            (displayFormats.map((format, index) => (
              <li key={index} className="panel__text">{format}</li>))
            )
          }
        </ul>
      </div>) :
    (null)
  )
}

const PanelFoundInSection = ({ ancestors, isItemLoading, params }) => (
  ancestors.title ?
    (<div className="panel__section">
      <h3 className="panel__heading">Found In</h3>
      <ul className="found-in">
      {isItemLoading ?
        (<FoundInItemSkeleton/>) :
        (<FoundInItem
            item={ancestors}
            className="found-in__collection"
            params={params}
            topLevel={true} />)}
      </ul>
    </div>) :
    (null)
)

const PanelLinkedListSection = ({ listData, title }) =>  (
  listData ?
    (<div className="panel__section">
      <h3 className="panel__heading">{title}</h3>
      <ul className="panel__list--unstyled">
        {listData.map((item, index) => (
        <li key={index} className="panel__text"><a href={item.uri}>{item.title}</a></li>))}
      </ul>
    </div>) :
    (null)
)

const PanelListSection = ({ listData, title }) =>  (
  listData ?
    (<div className="panel__section">
      <h3 className="panel__heading">{title}</h3>
      <ul className="panel__list--unstyled">
        {listData.map((item, index) => (
        <li key={index} className="panel__text">{item.title}</li>))}
      </ul>
    </div>) :
    (null)
)

const PanelTextSection = ({ params, text, title }) => {
  const parsedQuery = params && params.query ? (params.query) : ("")
  return (
  text ?
    (<div className="panel__section">
      <h3 className="panel__heading">{title}</h3>
      <p className="panel__text--narrative">
        <QueryHighlighter query={parsedQuery} text={text} />
      </p>
    </div>) :
    (null)
)}

const RecordsDetail = ({ ancestors, isAncestorsLoading, isContentShown, isItemLoading, item, params, savedList, toggleInList }) => {

  var [isSaved, setIsSaved] = useState(() => {
    return !isItemLoading && isItemSaved(item, savedList)
  })

  useEffect(() => {
    const saved = !isItemLoading && isItemSaved(item, savedList)
    setIsSaved(saved)
  }, [isItemLoading, item, savedList])

  return (
  <div className={classnames("records__detail", {"hidden": isContentShown})}>
    <nav>
      <a href={appendParams("/search", params)} className="btn btn--back">
        <MaterialIcon icon="keyboard_arrow_left"/>Back to Search
      </a>
    </nav>
    <h1 className="records__title">{isItemLoading ? <Skeleton /> : item.title }</h1>
    {item.type === "object" ?
      (item.online ? (
        <>
        <ListToggleButton
          className="btn-add--detail"
          isSaved={isSaved}
          item={item}
          toggleSaved={toggleInList} />
        <a className="btn btn-launch--detail"
          href={`${item.uri}/view`}>View Online <MaterialIcon icon="visibility" /></a>
        <Button
          className="btn-download--detail"
          handleClick={() => alert(`Downloading file for ${item.uri}`)}
          iconAfter="get_app"
          label="Download"
          uri={item.uri} />
        </>
      ) :
      (<ListToggleButton
        className="btn-add--detail"
        isSaved={isSaved}
        item={item}
        toggleSaved={toggleInList} />)
      ): (null)
    }
    <Accordion className="accordion" preExpanded={["summary"]} allowZeroExpanded={true}>
      <AccordionItem className="accordion__item" uuid="summary">
        <AccordionItemHeading className="accordion__heading" aria-level={2}>
          <AccordionItemButton className="accordion__button">Summary</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="accordion__panel">
          {isItemLoading ?
            (<DetailSkeleton />) :
            (<>
              <div className="panel__section--flex">
                <PanelLinkedListSection
                  title="Creators"
                  listData={item.creators} />
                <PanelTextSection
                  title="Dates"
                  text={dateString(item.dates)} />
                <PanelExtentSection
                  extents={item.extents} />
                <PanelFormatSection
                  formats={item.formats}
                  notes={item.notes} />
              </div>
              <PanelFoundInSection
                ancestors={ancestors}
                isItemLoading={isAncestorsLoading}
                params={params} />
              <PanelTextSection
                params={params}
                title="Description"
                text={noteText(item.notes, "abstract") || noteText(item.notes, "scopecontent")} />
              </>
              )
            }
        </AccordionItemPanel>
      </AccordionItem>
      { hasAccessAndUse(item.notes) ?
        (<AccordionItem className="accordion__item" uuid="accessAndUse">
          <AccordionItemHeading className="accordion__heading" aria-level={2}>
            <AccordionItemButton className="accordion__button">Access and Use</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="accordion__panel">
            <PanelTextSection
              title="Access"
              text={noteText(item.notes, "accessrestrict")} />
            <PanelTextSection
              title="Reproduction and Duplication"
              text={noteText(item.notes, "userestrict")} />
          </AccordionItemPanel>
        </AccordionItem>) :
        (null)}
      { item.terms && item.terms.length ?
        (<AccordionItem className="accordion__item" uuid="relatedTerms">
            <AccordionItemHeading className="accordion__heading" aria-level={2}>
              <AccordionItemButton className="accordion__button">Related Terms</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordion__panel">
              <PanelListSection
                title="Subjects"
                listData={item.terms} />
            </AccordionItemPanel>
          </AccordionItem>) :
        (null)}
    </Accordion>
  </div>
)}

RecordsDetail.propTypes = {
  item: PropTypes.object.isRequired,
  ancestors: PropTypes.object.isRequired,
  isAncestorsLoading: PropTypes.bool.isRequired,
  isContentShown: PropTypes.bool,
  isItemLoading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  savedList: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default RecordsDetail;
