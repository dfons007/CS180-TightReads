import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

//Pages
import LoginPage from "./pages";
import NotFoundPage from "./pages/404";
import MakeAccountsPage from "./pages/makeaccounts";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/makeaccounts" component={MakeAccountsPage}/>
      <Route exact path="/profile" component={ProfilePage}/>
      <Route exact path="/404" component={NotFoundPage}/>  {/*} Redirect to 404 Page at end of component if no other component found */}
      <Redirect to="/404"/>
      </Switch>
    </Router>
  );
}

export default App;
