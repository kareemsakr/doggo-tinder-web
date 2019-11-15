import React, { useContext } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Context as UserContext } from "../context/userContext";
import { Avatar, Typography } from "@material-ui/core";

export default () => {
  const { logout, userProfile, openEditProfileDialog } = useContext(
    UserContext
  );
  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.buttons}>
          <Button onClick={openEditProfileDialog} style={styles.editButton}>
            <SettingsIcon />
          </Button>
          <Button onClick={logout} style={styles.logoutButton}>
            <ExitToAppIcon />
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar src={userProfile.profile_picture} style={styles.avatar} />
            <div style={styles.ownerOverlay}>
              <Avatar
                src={userProfile.owner_picture}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>
          <Typography component="h1" variant="h5" style={{ marginTop: "50px" }}>
            {userProfile.name}
          </Typography>
          <Typography>{userProfile.bio}</Typography>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    postition: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    postition: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 5px 0px 5px"
  },
  profileCard: {
    postition: "relative",
    height: "550px",
    maxHeight: "80%",
    width: "70%",
    maxWidth: "450px",
    marginTop: "50px",
    marginBottom: "50px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 15px 25px -5px",
    backgroundColor: "#ffffff"
  },
  avatar: {
    width: "200px",
    height: "200px"
  },
  logoutButton: {
    jusifySelf: "end"
  },
  ownerOverlay: {
    position: "absolute",
    left: "60%",
    top: "65%"
  }
};
