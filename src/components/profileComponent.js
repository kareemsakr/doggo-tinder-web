import React, { useContext } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Context as UserContext } from "../context/userContext";
import { Avatar, Typography } from "@material-ui/core";

export default () => {
  const { logout, userProfile } = useContext(UserContext);
  console.log(userProfile);
  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.buttons}>
          <Button onClick={logout} style={styles.editButton}>
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
          <div style={{ position: "relative" }}>
            <Avatar src={userProfile.profile_picture} style={styles.avatar} />
            <div
              style={{
                display: "flex",
                position: "absolute",
                flexDirection: "row-reverse",
                alignItems: "flex-end",
                left: "0",
                top: "0",
                right: "0",
                bottom: "0"
              }}
            >
              <Avatar
                src={userProfile.profile_picture}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>
          <Typography component="h1" variant="h5">
            Name
          </Typography>
          <Typography>Bio blah blah blah blah blah blah blah</Typography>
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
    // borderRadius: "15px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 15px 25px -5px",
    backgroundColor: "#ffffff"
  },
  avatar: {
    width: "200px",
    height: "200px"
  },
  logoutButton: {
    jusifySelf: "end"
  }
};
