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
import { fetchMyList } from "./components/MyListHelpers";

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

  setMyListCount = data => {
    var list = data ? data : fetchMyList()
    var count = 0
    for (const [ , value] of Object.entries(list)) {
      count += Object.keys(value).length
    }
    this.setState({ "myListCount": count })
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
                  <PageMyList {...props} />
                } />
                <Route path="/search/" component={PageSearch} />
                <Route path="/:type(collections|objects)/:id" render={(props) =>
                  <PageRecords
                    {...props} />
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
