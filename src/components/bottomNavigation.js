import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import PetsIcon from "@material-ui/icons/Pets";
import ForumIcon from "@material-ui/icons/Forum";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

export default function SimpleBottomNavigation({ value, onChange }) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      <BottomNavigationAction label="Swipe" icon={<PetsIcon />} />
      <BottomNavigationAction label="Chat" icon={<ForumIcon />} />
    </BottomNavigation>
  );
}
