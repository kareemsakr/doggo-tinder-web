import React from "react";
import { Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import uuid from "uuid";

export default ({ avatarUrl, handleChange }) => {
  const uniqueID = uuid.v4();
  return (
    <div style={{ position: "relative" }}>
      <Avatar style={styles.avatar} src={avatarUrl} />
      <label htmlFor={uniqueID}>
        <div style={styles.editButton}>
          <EditIcon />
        </div>
      </label>
      <input
        id={uniqueID}
        type="file"
        name="Dog Photo"
        hidden
        onChange={handleChange}
      />
    </div>
  );
};

const styles = {
  avatar: {
    width: "140px",
    height: "140px",
    position: "relative"
  },
  editButton: {
    position: "absolute",
    left: "75%",
    top: "75%",
    backgroundColor: "#999",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)"
  }
};
