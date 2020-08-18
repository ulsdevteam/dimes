import React, { Component } from 'react';
import Button from "./Button";

class PageRecord extends Component {
  constructor(props) {
    super(props)
    this.exampleData = {
      "uri": "/objects/wjhfxgo5jdzsysz72cbypcyhp3"
    }
  }
  saveItem = item => {
	  var existing = localStorage.getItem("savedItems");
    existing = existing ? JSON.parse(existing) : {};
    existing[item.uri] = {"saved": Date.now()}
	  localStorage.setItem("savedItems", JSON.stringify(existing));
  }
  render() {
    return (
      <div>
         <h1>Collection or Object Details and Context</h1>
         <Button
           label="Add example data"
           iconAfter="add_circle_outline"
           className="btn--gray btn--sm"
           onClick={this.saveItem(this.exampleData)} />
      </div>
    )
  }
}

export default PageRecord;
