import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { uploadFile } from "react-s3";

import uuid from "uuid";

const s3Config = {
  bucketName: "doggo-tinder-photos",
  region: "ca-central-1",
  dirName: "uploads/",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
};

class FirebaseSDK {
  constructor() {
    console.disableYellowBox = true;
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DB_URL,
        projectId: process.env.REACT_APP_PROJ_ID,
        storageBucket: process.env.REACT_APP_STORE_BUCKET,
        messagingSenderId: process.env.REACT_APP_SENDER_ID
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  signUp = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {
        firebase
          .database()
          .ref("users/" + resp.user.uid)
          .set({
            name: "",
            bio: "",
            profile_picture:
              "https://doggo-tinder-photos.s3.ca-central-1.amazonaws.com/uploads/loadingdog.png",
            owner_picture: "",
            id: resp.user.uid,
            likes: {}
          });
        success_callback(resp);
      }, failed_callback);
  };

  logOut = async () => {
    await firebase.auth().signOut();
  };

  getLoggedInUser = cb => {
    firebase.auth().onAuthStateChanged(cb);
  };

  getUserProfile = async cb => {
    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      firebase
        .database()
        .ref("users/" + userRef.uid)
        .on("value", cb);
    }
  };

  setUserProfile = () => {
    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      firebase
        .database()
        .ref("users/" + userRef.uid)
        .on("value", snapshot => {
          const profile = snapshot.val();
          this.loggedInUserProfile = profile;
          console.log(profile);
        });
    }
  };

  getUserProfileOnce = async () => {
    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      const response = await firebase
        .database()
        .ref("users/" + userRef.uid)
        .once("value");
      return response.val();
    }
  };

  getLoggedInUserId = () => {
    return firebase.auth().currentUser.uid;
  };
  getLoggedInUserOnce = () => {
    return firebase.auth().currentUser;
  };

  getProfilesForSwiping = cb => {
    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      firebase
        .database()
        .ref("users/")
        .once("value", cb);
    }
  };

  //does this id like logged in user
  doesLike = async id => {
    const snapshot = await firebase
      .database()
      .ref("users/" + id)
      .once("value");
    return this.getLoggedInUserId() in (snapshot.val().likes || {});
  };

  addLike = async (id, matchCallBack) => {
    var userRef = firebase.auth().currentUser;
    if (userRef) {
      firebase
        .database()
        .ref("users/" + userRef.uid + "/likes")
        .update({ [id]: true });

      if (await this.doesLike(id)) {
        // add match to user reference
        firebase
          .database()
          .ref("users/" + userRef.uid + "/matches")
          .update({ [id]: true });

        firebase
          .database()
          .ref("users/" + id + "/matches")
          .update({ [userRef.uid]: true });

        // add a match reference to store the chat
        firebase
          .database()
          .ref("matches/" + this.getCombinedId(this.getLoggedInUserId(), id))
          .push({
            _id: uuid.v4(),
            text: "We Matched woof woof.",
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            system: true
          });

        matchCallBack();
      }
    }
  };

  getCombinedId = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };
  updateUserProfile = async (userProf, success_callback, failed_callback) => {
    let profileStorageURL = "";
    if (userProf.profile_picture_BLOB) {
      const response = await uploadFile(
        userProf.profile_picture_BLOB,
        s3Config
      );
      profileStorageURL = response.location;
    } else {
      profileStorageURL = userProf.profile_picture;
    }

    let ownerStorageURL = "";
    if (userProf.owner_picture_BLOB) {
      const response = await uploadFile(userProf.owner_picture_BLOB, s3Config);
      ownerStorageURL = response.location;
    } else {
      ownerStorageURL = userProf.owner_picture;
    }

    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      firebase
        .database()
        .ref("users/" + userRef.uid)
        .update({
          name: userProf.name,
          bio: userProf.bio,
          profile_picture: profileStorageURL,
          owner_picture: ownerStorageURL,
          id: userRef.uid
        })
        .then(success_callback)
        .catch(failed_callback);
    }
  };

  getMatches = async cb => {
    var userRef = firebase.auth().currentUser;
    if (userRef != null) {
      firebase
        .database()
        .ref("users/" + userRef.uid)
        .on("value", async snapshot => {
          let matchIds = Object.keys(snapshot.val().matches || {});
          let result = [];
          for (let index = 0; index < matchIds.length; index++) {
            const key = matchIds[index];
            const match = await firebase
              .database()
              .ref("users/" + key)
              .once("value");
            result.push(match.val());
          }
          cb(result);
        });
    }
  };

  getChatMessages = cb => {
    firebase
      .database()
      .ref(
        "matches/" +
          firebaseSDK.getCombinedId(
            this.getLoggedInUserId(),
            this.getRecipientId
          )
      )
      .limitToLast(20)
      .on("child_added", snapshot => cb(this.parse(snapshot)));
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = { _id, timestamp, text, user };
    return message;
  };

  sendMessage = messages => {
    const matchRef = firebase
      .database()
      .ref(
        "matches/" +
          firebaseSDK.getCombinedId(
            this.getLoggedInUserId(),
            this.getRecipientId
          )
      );

    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      console.log("adding message", user);
      const message = {
        text,
        user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      };
      matchRef.push(message);
    }
  };
  chatRefOff = () => {
    firebase
      .database()
      .ref(
        "matches/" +
          firebaseSDK.getCombinedId(
            this.getLoggedInUserId(),
            this.getRecipientId
          )
      )
      .off("child_added");
  };

  setRecipient(id) {
    this.recipientId = id;
  }
  get getRecipientId() {
    return this.recipientId;
  }
}

const firebaseSDK = new FirebaseSDK();

export default firebaseSDK;
