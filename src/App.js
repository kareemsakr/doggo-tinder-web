import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider as UserProvider } from "./context/userContext";
import LoginFlow from "./components/loginFlow";
import MainFlow from "./components/mainFlow";

import ProtectedRoute from "./components/ProtectedRoute";

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
        </Switch>
      </UserProvider>
    </Router>
  );
};
