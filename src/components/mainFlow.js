import React, { useContext } from "react";
import { Context as UserContext } from "../context/userContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button, Paper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import BottomNavigation from "./bottomNavigation";
import MatchesComponent from "./matchesComponent";
import SwipeComponent from "./swipeComponent";
import ProfileComponent from "./profileComponent";

export default () => {
  const { logout } = useContext(UserContext);
  const [value, setValue] = React.useState(1);
  const theme = useTheme();

  return (
    <div>
      <Button onClick={logout}>
        <ExitToAppIcon />
      </Button>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
      >
        <ProfileComponent />
        <SwipeComponent />
        <MatchesComponent />
      </SwipeableViews>
      <BottomNavigation onChange={setValue} value={value} />
    </div>
  );
};
