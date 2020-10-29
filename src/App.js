import React, { Component } from "react";
import { LiveAnnouncer } from "react-aria-live";
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
import { fetchMyList, isItemSaved, removeItem, saveItem, saveMyList } from "./components/MyListHelpers";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myListCount: 0,
    }
  }

  componentDidMount() {
    this.setState({myListCount: this.countMyList()})
  }

  countMyList = data => {
    var list = data ? data : fetchMyList()
    return list.length
  }

  removeAllListItems = () => {
    saveMyList([]);
    this.setState({ myListCount: 0 })
  }

  toggleInList = item => {
    const saved = isItemSaved(item)
    saved ? removeItem(item) : saveItem(item)
    this.setState({ myListCount: this.countMyList() })
    return !saved
  }

  render() {
    return (
        <LiveAnnouncer>
          <SkipLink />
          <Header myListCount={this.state.myListCount} />
          <main id="main" role="main">
            <div className="wrapper">
              <Switch>
                <Route path="/list/" render={(props) =>
                  <PageMyList
                    {...props}
                    removeAllListItems={this.removeAllListItems}
                    toggleInList={this.toggleInList} />
                } />
                <Route path="/search/" component={PageSearch} />
                <Route path="/:type(collections|objects)/:id/view/"
                    component={PageDigitalObject} />
                <Route path="/:type(collections|objects)/:id" render={(props) =>
                  <PageRecords
                    {...props}
                    myListCount={this.state.myListCount}
                    toggleInList={this.toggleInList} />
                } />
                <Route path="/agents/:id" component={PageAgent} />
                <Route exact path="/" component={PageHome} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </div>
          </main>
        <Footer/>
      </LiveAnnouncer>
    );
  }
}

export default App;
