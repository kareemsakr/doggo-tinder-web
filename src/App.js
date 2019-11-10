import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider as UserProvider } from "./context/userContext";
import LoginFlow from "./components/loginFlow";
import MainFlow from "./components/mainFlow";
// import Test from "./components/test";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

export default () => {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <ProtectedRoute exact path="/">
            <MainFlow />
          </ProtectedRoute>
          <Route path="/login">
            <LoginFlow />
          </Route>
          {/* <Route path="/test">
            <Test />
          </Route> */}
        </Switch>
      </UserProvider>
    </Router>
  );
};
