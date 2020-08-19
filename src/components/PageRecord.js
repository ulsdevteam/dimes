import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from "./Button";

class PageRecord extends Component {
  constructor(props) {
    super(props)
    // This is example data to test myList functionality
    const exampleData = [
      {
        "uri": "/objects/wjhfxgo5jdzsysz72cbypcyhp3/",
        "group": "/collections/qkxsgwnspzw9nh8htnoaiserc4/"
      },
      {
        "uri": "/objects/qckuiz9z5hb358esjsyuxqxfx4/",
        "group": "/collections/qkxsgwnspzw9nh8htnoaiserc4/"
      },
      {
        "uri": "/objects/jahav8ukco7ztxjdy2xc4poa95/",
        "group": "/collections/qkxsgwnspzw9nh8htnoaiserc4/"
      },
      {
        "uri": "/objects/rq6x9jtb24qpps7oujdrsdiou3/",
        "group": "/collections/qkxsgwnspzw9nh8htnoaiserc4/"
      },
      {
        "uri": "/objects/u8ihqyop5p4vxpq7oxg236f9y4/",
        "group": "/collections/rf8ifduv77hwzspm5eqow4ycw4/"
      },
      {
        "uri": "/objects/s294v2qnsoo6ufn4qrdqjh3po4/",
        "group": "/collections/qkxsgwnspzw9nh8htnoaiserc4/"
      }
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
