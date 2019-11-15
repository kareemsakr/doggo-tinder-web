import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import BottomNavigation from "./bottomNavigation";
import MatchesComponent from "./matchesComponent";
import SwipeComponent from "./swipeComponent";
import ProfileComponent from "./profileComponent";
import EditProfileDialog from "./EditProfile";
import { Context as UserContext } from "../context/userContext";
export default () => {
  const [value, setValue] = useState(1);
  const theme = useTheme();
  const {
    profileDialogOpen,
    closeEditProfileDialog,
    openEditProfileDialog
  } = useContext(UserContext);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#f5f7fa" }}>
      <EditProfileDialog
        open={profileDialogOpen}
        close={() => closeEditProfileDialog}
      />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        style={{ height: "100%", overflow: "hidden" }}
        disabled
      >
        <ProfileComponent openEditProfile={() => openEditProfileDialog} />
        <SwipeComponent />
        <MatchesComponent />
      </SwipeableViews>
      <BottomNavigation onChange={setValue} value={value} />
    </div>
  );
};
