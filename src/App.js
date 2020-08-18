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
    this.fetchMyListCount()
  }
  fetchMyListCount() {
    var existing = localStorage.getItem("savedItems");
    existing = existing ? JSON.parse(existing) : {};
    this.updateMyListCount(Object.keys(existing).length)
  }
  updateMyListCount = count  => {
    this.setState({ "myListCount": count })
  }
  render() {
    return (
        <div>
          <Header myListCount={this.state.myListCount} />
          <div className="wrapper">
            <Switch>
              <Route path="/list/" component={PageMyList} />
              <Route path="/search/" component={PageSearch} />
              <Route path="/records/" component={() => <PageRecord updateMyListCount={this.updateMyListCount}/>} />
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
