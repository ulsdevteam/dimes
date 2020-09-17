import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import "./styles.scss";

export const SearchPagination = props => (
  <ReactPaginate
    previousLabel={"keyboard_arrow_left"}
    previousClassName={"pagination__button"}
    nextLabel={"keyboard_arrow_right"}
    nextClassName={"pagination__button"}
    breakLabel={'...'}
    breakClassName={'pagination__break'}
    forcePage={props.offset && Math.ceil(props.offset / props.pageSize)}
    pageCount={props.pageCount}
    marginPagesDisplayed={1}
    pageRangeDisplayed={4}
    onPageChange={props.handlePageClick}
    containerClassName={'pagination__list'}
    pageClassName={'pagination__page'}
    activeClassName={'page__active'}
  />
)

SearchPagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  offset: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,

}
