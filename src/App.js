import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SkipLink from "./components/SkipLink";
import PageAgent from "./components/PageAgent";
import PageRecords from "./components/PageRecords";
import PageDigitalObject from "./components/PageDigitalObject";
import PageHome from "./components/PageHome";
import PageMyList from "./components/PageMyList";
import PageSearch from "./components/PageSearch";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "myListCount": 0
    }
  }

  componentDidMount() {
    this.setMyListCount()
  }

  fetchMyList() {
    var existing = localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_KEY}`);
    return existing ? JSON.parse(existing) : {};
  }

  saveMyList = list => {
    localStorage.setItem(`${process.env.REACT_APP_LOCALSTORAGE_KEY}`, JSON.stringify(list));
    this.setMyListCount()
  }

  setMyListCount = data => {
    var list = data ? data : this.fetchMyList()
    var count = 0
    for (const [ , value] of Object.entries(list)) {
      count += Object.keys(value).length
    }
    this.setState({ "myListCount": count })
  }

  removeItem = (itemUri, groupUri) => {
    // TODO: find a way to call this without triggering a component refresh
    // This happens because we set myListCount at the app level
    var list = this.fetchMyList();
    console.log(list)
    console.log(groupUri, itemUri)
    delete list[groupUri][itemUri]
    console.log(list)
    if (Object.entries(list[groupUri]).length === 0) {
      delete list[groupUri]
    }
    this.saveMyList(list);
  }

  render() {
    return (
        <React.Fragment>
          <SkipLink />
          <Header myListCount={this.state.myListCount} />
          <main id="main" role="main">
            <div className="wrapper">
              <Switch>
                <Route path="/list/" render={(props) =>
                  <PageMyList
                    {...props}
                    fetchMyList={this.fetchMyList}
                    removeItem={this.removeItem}
                    saveMyList={this.saveMyList} />
                } />
                <Route path="/search/" component={PageSearch} />
                <Route path="/:type(collections|objects)/:id" render={(props) =>
                  <PageRecords
                    {...props}
                    fetchMyList={this.fetchMyList}
                    removeItem={this.removeItem}
                    saveMyList={this.saveMyList}/>
                } />
                <Route path="/agents/:id" component={PageAgent} />
                <Route path="/view/" component={PageDigitalObject} />
                <Route exact path="/" component={PageHome} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </div>
          </main>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
