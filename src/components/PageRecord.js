import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from "./Button";

class PageRecord extends Component {
  constructor(props) {
    super(props)
    // This is example data to test myList functionality
    const exampleData = [
      {
        "uri": "/objects/MzLg8JcyXmM2BBeakxnARq/",
        "group": "/collections/ndQQPbTBCnVGhKs3U2VReD/"
      },
      {
        "uri": "/objects/FA9AL9XqUNqQW3nNrfJVW5/",
        "group": "/collections/ndQQPbTBCnVGhKs3U2VReD/"
      },
      {
        "uri": "/objects/4Mfz4GgZ2v4MYvBDqeX4AB/",
        "group": "/collections/ndQQPbTBCnVGhKs3U2VReD/"
      },
      {
        "uri": "/objects/7F4SoSV2kFsprCuexMUtnk/",
        "group": "/collections/ndQQPbTBCnVGhKs3U2VReD/"
      },
      {
        "uri": "/objects/ZYBLHUh9Y5Zd9JHdutqmod/",
        "group": "/collections/ndQQPbTBCnVGhKs3U2VReD/"
      }
    ]
    this.requestButtons = exampleData.map((item, idx) =>
      <Button
        key={idx}
        label="Add example data"
        iconAfter="add_circle_outline"
        className="btn--gray btn--sm"
        handleClick={() => this.saveItem(item)} />
    );
  }
  saveItem = item => {
    var list = this.props.fetchMyList()
    if (!list[item.group]) {
      list[item.group] = {}
    }
    if (!list[item.group][item.uri]) {
      list[item.group][item.uri] = {"saved": Date.now()}
      this.props.saveMyList(list)
    }
  }
  requestButtons
  render() {
    return (
      <div>
         <h1>Collection or Object Details and Context</h1>
         {this.requestButtons}
      </div>
    )
  }
}

PageRecord.propTypes = {
  fetchMyList: PropTypes.func.isRequired,
  saveMyList: PropTypes.func.isRequired
}

export default PageRecord;
