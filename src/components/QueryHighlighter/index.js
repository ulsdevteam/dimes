import React from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";
import "./styles.scss";


const QueryHighlighter = ({ hitCount, query, text }) => {
  const parsedQuery = query && hitCount ? query.replace(/"([^"]+(?="))"/g, '$1').split(" ") : []
  return (
    <Highlighter
        highlightClassName="query-highlight"
        searchWords={parsedQuery}
        autoEscape={true}
        textToHighlight={text ? text : ""}
      />
    )
  }

QueryHighlighter.propTypes = {
  query: PropTypes.string,
  text: PropTypes.string,
}

export default QueryHighlighter;
