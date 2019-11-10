import React, { useContext } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import { Context as UserContext } from "../context/userContext";

export default () => {
  const { logout } = useContext(UserContext);

  return (
    <div>
      profile{" "}
      <Button onClick={logout}>
        <ExitToAppIcon />
      </Button>
    </div>
  );
};
