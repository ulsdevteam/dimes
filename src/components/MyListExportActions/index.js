import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import classnames from "classnames";


const MyListExportActions = ({ confirmDeleteAll, downloadCsv, emailList, isDownloading }) => (
  <div className="mylist__export-actions">
    <Button
      className="btn--orange btn--sm"
      label="Email List"
      iconBefore="email"
      handleClick={emailList} />
    <Button
      className={classnames("btn--orange", "btn--sm", {"loading-dots": isDownloading})}
      label={isDownloading ? "Downloading" : "Download as .CSV"}
      handleClick={downloadCsv}
      disabled={isDownloading} />
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
  isDownloading: PropTypes.bool,
}

export default MyListExportActions
