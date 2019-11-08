import React, { useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";
import { Context as UserContext } from "../context/userContext";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 600
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { user, resetError } = useContext(UserContext);
  const handleChange = (event, newValue) => {
    resetError("");
    setValue(newValue);
  };

  if (user) return <Redirect to="/" />;

  return (
    <Grid container justify="center" alignItems="center">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
        >
          <LoginForm active={value === 0} dir={theme.direction} />
          <SignUpForm active={value === 1} dir={theme.direction} />
        </SwipeableViews>
      </div>
    </Grid>
  );
}
