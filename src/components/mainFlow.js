import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import BottomNavigation from "./bottomNavigation";
import MatchesComponent from "./matchesComponent";
import SwipeComponent from "./swipeComponent";
import ProfileComponent from "./profileComponent";

export default () => {
  const [value, setValue] = React.useState(1);
  const theme = useTheme();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        style={{ height: "100%" }}
      >
        <ProfileComponent />
        <SwipeComponent />
        <MatchesComponent />
      </SwipeableViews>
      <BottomNavigation onChange={setValue} value={value} />
    </div>
  );
};
