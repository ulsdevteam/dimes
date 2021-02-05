import React from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";
import { findChunks } from "highlight-words-core";
import "./styles.scss";


const findChunksBoolean = ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight
  }) => {
    if (searchWords.every(word => textToHighlight.toLowerCase().includes(word.toLowerCase()))) {
      return findChunks({autoEscape, caseSensitive, sanitize, searchWords, textToHighlight})
    } else {
      return []
    }
  };

const QueryHighlighter = ({ query, text }) => {
  const parsedQuery = query ? query.replace(/"([^"]+(?="))"/g, '$1').split(" ") : []
  return (
    <Highlighter
        highlightClassName="query-highlight"
        searchWords={parsedQuery}
        autoEscape={true}
        textToHighlight={text ? text : ""}
        findChunks={findChunksBoolean}
      />
    )
  }

QueryHighlighter.propTypes = {
  query: PropTypes.string,
  text: PropTypes.string,
}

export default QueryHighlighter;
