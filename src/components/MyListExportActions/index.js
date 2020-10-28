import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";


const MyListExportActions = ({ confirmDeleteAll, downloadCsv, emailList }) => (
  <div className="mylist__export-actions show-on-lg-up">
    <Button
      className="btn--orange btn--sm"
      label="Email List"
      iconBefore="email"
      handleClick={emailList} />
    <Button
      className="btn--orange btn--sm"
      label="Download as .CSV"
      iconBefore="get_app"
      handleClick={downloadCsv} />
    <Button
      className="btn--gray btn--sm"
      label="Remove All Items"
      iconBefore="delete"
      handleClick={() => confirmDeleteAll()} />
  </div>)

MyListExportActions.propTypes = {
  confirmDeleteAll: PropTypes.func.isRequired,
  downloadCsv: PropTypes.func.isRequired,
  emailList: PropTypes.func.isRequired,
}

export default MyListExportActions
