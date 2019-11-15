import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Context as UserContext } from "../context/userContext";

import EditAvatar from "./EditAvatarComponent";

export default () => {
  const {
    updateProfile,
    userProfile,
    closeEditProfileDialog,
    profileDialogOpen
  } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  console.log(profile);

  const [error, setError] = useState("");
  const handleAvatarChange = avatarName => {
    return e => {
      const avatarBlob = e.target.files[0];
      const avatarURL = URL.createObjectURL(e.target.files[0]);
      setProfile(prevState => {
        return {
          ...prevState,
          [avatarName]: avatarURL,
          [avatarName + "_BLOB"]: avatarBlob
        };
      });
    };
  };

  const handleSave = () => {
    const { name, bio, profile_picture, owner_picture } = profile;
    if (!name || !bio || !profile_picture || !owner_picture) {
      setError("All fields are mandatory.");
      return;
    }
    updateProfile(
      profile,
      () => {
        closeEditProfileDialog();
      },
      e => {
        console.log(e);
      }
    );
  };

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  return (
    <Dialog open={profileDialogOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        Update Profile
      </DialogTitle>
      <DialogContent>
        <div style={styles.avatarSection}>
          <EditAvatar
            handleChange={handleAvatarChange("profile_picture")}
            avatarUrl={profile.profile_picture}
          />
          <EditAvatar
            handleChange={handleAvatarChange("owner_picture")}
            avatarUrl={profile.owner_picture}
          />
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={profile.name || ""}
          onChange={e => {
            const val = e.target.value;
            setProfile(oldProfile => {
              return { ...oldProfile, name: val };
            });
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="bio"
          label="Bio"
          type="text"
          fullWidth
          multiline
          value={profile.bio || ""}
          onChange={e => {
            const val = e.target.value;
            setProfile(oldProfile => {
              return { ...oldProfile, bio: val };
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  avatarSection: {
    display: "flex",
    justifyContent: "space-evenly",
    position: "relative"
  }
};
