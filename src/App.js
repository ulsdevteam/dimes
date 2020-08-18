import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageAgent from "./components/PageAgent";
import PageRecord from "./components/PageRecord";
import PageDigitalObject from "./components/PageDigitalObject";
import PageHome from "./components/PageHome";
import PageMyList from "./components/PageMyList";
import PageSearch from "./components/PageSearch";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  // TODO: eliminate root div
  constructor(props) {
    super(props)
    this.state = {
      "myListCount": 0
    }
  }
  componentDidMount() {
    this.updateMyListCount()
  }
  fetchMyList() {
    var existing = localStorage.getItem("savedItems");
    return existing ? JSON.parse(existing) : {};
  }
  saveMyList = list => {
    localStorage.setItem("savedItems", JSON.stringify(list));
    this.updateMyListCount(Object.keys(list).length)
  }
  fetchMyListCount = () => {
    var list = this.fetchMyList()
    return Object.keys(list).length
  }
  updateMyListCount = count  => {
    count = count ? count : this.fetchMyListCount()
    this.setState({ "myListCount": count })
  }
  render() {
    return (
        <div>
          <Header myListCount={this.state.myListCount} />
          <div className="wrapper">
            <Switch>
              <Route path="/list/" component={() =>
                <PageMyList
                  fetchMyList={this.fetchMyList}
                  saveMyList={this.saveMyList}
                  updateMyListCount={this.updateMyListCount} />
              } />
              <Route path="/search/" component={PageSearch} />
              <Route path="/records/" component={() =>
                <PageRecord
                  fetchMyList={this.fetchMyList}
                  saveMyList={this.saveMyList}
                  updateMyListCount={this.updateMyListCount} />
                } />
              <Route path="/agents/:id" component={PageAgent} />
              <Route path="/view/" component={PageDigitalObject} />
              <Route exact path="/" component={PageHome} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
