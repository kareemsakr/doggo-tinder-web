import React, { useState } from "react";
import FirebaseSDK from "../services/FirebaseSDK";
import { useHistory } from "react-router-dom";

const Context = React.createContext();

const Provider = ({ children }) => {
  let [user, setUser] = useState({});
  let history = useHistory();

  FirebaseSDK.getLoggedInUser(currentUser => {
    setUser(currentUser);
  });

  const login = (email, password) => {
    FirebaseSDK.login(
      { email, password },
      () => {
        history.push("/");
      },
      () => {}
    );
  };
  return (
    <Context.Provider value={{ user, login }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
