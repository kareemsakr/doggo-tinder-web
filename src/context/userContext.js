import React, { useState, useEffect } from "react";
import FirebaseSDK from "../services/FirebaseSDK";
import { useHistory } from "react-router-dom";

const Context = React.createContext();

const Provider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [userProfile, setUserProfile] = useState({});
  let [error, setError] = useState("");
  let [profiles, setProfiles] = useState({ length: 0 });
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  let history = useHistory();

  useEffect(() => {
    FirebaseSDK.getLoggedInUser(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        FirebaseSDK.getUserProfile(res => {
          if (!res.val().name) {
            setProfileDialogOpen(true);
          }
          setUserProfile(res.val() || {});
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const getProfilesForSwiping = () => {
    FirebaseSDK.getProfilesForSwiping(res => {
      let arrayOfProfiles = [];

      res.forEach(element => {
        arrayOfProfiles.push(element.val());
      });
      setProfiles(arrayOfProfiles);
    });
  };

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

  const updateProfile = (profile, success, fail) => {
    FirebaseSDK.updateUserProfile(profile, success, fail);
  };

  const openEditProfileDialog = () => setProfileDialogOpen(true);
  const closeEditProfileDialog = () => setProfileDialogOpen(false);

  return (
    <Context.Provider
      value={{
        openEditProfileDialog,
        closeEditProfileDialog,
        profileDialogOpen,
        userProfile,
        user,
        login,
        error,
        resetError,
        signUp,
        logout,
        profiles,
        getProfilesForSwiping,
        updateProfile
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
