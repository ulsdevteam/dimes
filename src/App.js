import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageAgent from "./components/PageAgent";
import PageRecord from "./components/PageRecord";
import PageDigitalObject from "./components/PageDigitalObject";
import PageHome from "./components/PageHome";
import PageList from "./components/PageList";
import PageSearch from "./components/PageSearch";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
      <div>
      <Header />
        <Switch>
          <Route path="/list/" component={PageList} />
          <Route path="/search/" component={PageSearch} />
          <Route path="/record/" component={PageRecord} />
          <Route path="/agent/:id" component={PageAgent} />
          <Route path="/view/" component={PageDigitalObject} />
          <Route exact path="/" component={PageHome} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer/>
      </div>
  );
}

export default App;
