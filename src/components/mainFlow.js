import React, { useContext } from "react";
import { Context as UserContext } from "../context/userContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

export default () => {
  const { logout } = useContext(UserContext);
  return (
    <div>
      <Button onClick={logout}>
        <ExitToAppIcon />
      </Button>
    </div>
  );
};
