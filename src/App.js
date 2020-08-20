import React from "react";
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

function App() {
  // TODO: eliminate root div
  return (
      <React.Fragment>
        <Header />
          <div className="wrapper">
            <Switch>
              <Route path="/list/" component={PageMyList} />
              <Route path="/search/" component={PageSearch} />
              <Route path="/records/" component={PageRecord} />
              <Route path="/agents/:id" component={PageAgent} />
              <Route path="/view/" component={PageDigitalObject} />
              <Route exact path="/" component={PageHome} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        <Footer/>
      </React.Fragment>
  );
}

export default App;
