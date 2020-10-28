import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const MyListSidebar = ({ duplicationRequest, readingRoomRequest, sendEmail }) => (
  <aside className="mylist__sidebar show-on-lg-up">
    <Button
      className="btn--orange btn--lg"
      label="Schedule a Visit"
      iconBefore="account_balance"
      handleClick={() => sendEmail()} />
    <Button
      className="btn--orange btn--lg"
      label="Request in Reading Room"
      iconBefore="local_library"
      handleClick={() => readingRoomRequest()} />
    <Button
      className="btn--orange btn--lg"
      label="Request Copies"
      iconBefore="content_copy"
      handleClick={() => duplicationRequest()} />
  </aside>)

MyListSidebar.propTypes = {
  duplicationRequest: PropTypes.func.isRequired,
  readingRoomRequest: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired
}

export default MyListSidebar
