import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context as UserContext } from "../context/userContext";

export default ({ children, ...rest }) => {
  const { user } = useContext(UserContext);

  if (user) return <Route {...rest}>{children}</Route>;
  return <Redirect to="/login" />;
};
