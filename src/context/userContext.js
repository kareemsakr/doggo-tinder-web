import React, { useState, useEffect } from "react";
import FirebaseSDK from "../services/FirebaseSDK";
import { useHistory } from "react-router-dom";

const Context = React.createContext();

const Provider = ({ children }) => {
  let [user, setUser] = useState();
  let [error, setError] = useState("");
  let history = useHistory();

  useEffect(() => {
    FirebaseSDK.getLoggedInUser(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logout = () => {
    FirebaseSDK.logOut();
  };

  const login = (email, password) => {
    FirebaseSDK.login(
      { email, password },
      () => {
        setError("");
        history.push("/");
      },
      res => {
        setError(res.message);
      }
    );
  };

  const signUp = (email, password) => {
    FirebaseSDK.signUp(
      { email, password },
      () => {
        setError("");
      },
      res => {
        setError(res.message);
      }
    );
  };

  const resetError = () => {
    setError("");
  };

  return (
    <Context.Provider
      value={{ user, login, error, resetError, signUp, logout }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
