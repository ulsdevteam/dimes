import React, { Component } from 'react';
import Button from "./Button";

class PageRecord extends Component {
  constructor(props) {
    super(props)
    // This is example data to test myList functionality
    const exampleData = [
      {"uri": "/objects/wjhfxgo5jdzsysz72cbypcyhp3"},
      {"uri": "/objects/qckuiz9z5hb358esjsyuxqxfx4"},
      {"uri": "/objects/jahav8ukco7ztxjdy2xc4poa95"},
      {"uri": "/objects/rq6x9jtb24qpps7oujdrsdiou3"},
      {"uri": "/objects/rg8ia6yvtv63buq4sg3jpsdph4"},
      {"uri": "/objects/s294v2qnsoo6ufn4qrdqjh3po4"}
    ]
    this.requestButtons = exampleData.map((item, idx) =>
      <Button
        key={idx}
        label="Add example data"
        iconAfter="add_circle_outline"
        className="btn--gray btn--sm"
        onClick={() => this.saveItem(item)} />
    );
  }
  saveItem = item => {
	  var list = this.props.fetchMyList()
    list[item.uri] = {"saved": Date.now()}
    this.props.saveMyList(list)
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

export default PageRecord;
