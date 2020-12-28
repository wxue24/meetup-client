import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import geohash from "ngeohash";

import { db, auth, functions } from "../../firebase/config";
import {
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_ERRORS,
  ADD_USER_DATA,
  SET_UNAUTHENTICATED,
} from "../types";
import { validateSignup, validateLogin } from "../../utils/validators";

let uid = "";
// // *Testing code
// if (!auth.currentUser) {
//   auth.signInWithEmailAndPassword("new1@email.com", "password");
//   uid = auth.currentUser.uid;
// } else {
//   uid = auth.currentUser.uid;
// }

// // *

const updatePrivateDoc = (data) => {
  if (!uid) uid = auth.currentUser.uid;
  return db
    .doc(`/private/${uid}`)
    .set(data, { merge: true })
    .catch((err) => {
      console.log(err);
      throw new Error("Can't upload to private database");
    });
};

const updatePublicDoc = (data) => {
  if (!uid) uid = auth.currentUser.uid;
  return db
    .doc(`/users/${uid}`)
    .set(data, { merge: true })
    .catch((err) => {
      console.log(err);
      throw new Error("Can't upload to public database");
    });
};

export const tryLocalLogin = () => async (dispatch) => {
  let email = await AsyncStorage.getItem("email");
  let password = await AsyncStorage.getItem("password");
  uid = await AsyncStorage.getItem("uid");
  let user = auth.currentUser;
  if (user && !uid) {
    uid = user.uid;
    dispatch({ type: ADD_USER_DATA, payload: { uid } });
    dispatch({ type: SET_AUTHENTICATED });
  } else if (!user && email && password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        uid = auth.currentUser.uid;
        dispatch({ type: ADD_USER_DATA, payload: { uid } });
        dispatch({ type: SET_AUTHENTICATED });
      })
      .catch((err) => {
        console.log("Local login failed", err.message);
      });
  } else if (!email && !password) {
    // TODO: temporary login if AsyncStorage not found
    auth
      .signInWithEmailAndPassword("new1@email.com", "password")
      .then(() => {
        uid = auth.currentUser.uid;
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({ type: ADD_USER_DATA, payload: { uid } });
      })
      .catch((err) => console.log(err.message));
  } else {
    console.log("Email and password not saved locally");
    dispatch({ type: SET_UNAUTHENTICATED });
  }
};

export const setErrors = (errors) => (dispatch) => {
  dispatch({ type: SET_ERRORS, payload: errors });
};

export const setAuthenticated = () => (dispatch) => {
  dispatch({ type: SET_AUTHENTICATED });
};

export const signup = (email, password, confirmPassword, handle) => async (
  dispatch
) => {
  dispatch({ type: CLEAR_ERRORS });
  const { errors, valid } = validateSignup(
    email,
    password,
    confirmPassword,
    handle
  );
  if (!valid) dispatch({ type: SET_ERRORS, payload: errors });
  else {
    uid;
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        uid = auth.currentUser.uid;
        AsyncStorage.setItem("uid", uid);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
        return db.doc(`/users/${uid}`).get();
      })
      .then((doc) => {
        if (doc.exists) {
          return dispatch({
            type: SET_ERRORS,
            payload: { handle: "This username is already taken" },
          });
        } else {
          db.doc(`/users/${uid}`)
            .set({
              handle,
            })
            .then(() => {
              db.doc(`/private/${uid}`).set({});
            })
            .then(() => {
              dispatch({ type: CLEAR_ERRORS });
              // dispatch({ type: SET_AUTHENTICATED });
              return true;
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
        // TODO handle different errors
        dispatch({ type: SET_ERRORS, payload: { general: err.message } });
        return false;
      });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  const { errors, valid } = validateLogin(email, password);
  if (!valid) dispatch({ type: SET_ERRORS, payload: errors });
  else {
    uid;
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        uid = auth.currentUser.uid;
        AsyncStorage.setItem("uid", uid);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({ type: CLEAR_ERRORS });
        return true;
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: { general: err.message } });
        return false;
      });
  }
};

export const switchAuthScreen = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const validatePhone = (phone) => async (dispatch) => {
  const sendOTP = functions.httpsCallable("sendOTP");

  await sendOTP({ phone })
    .then((result) => {
      const formattedPhone = result.data.phone;
      dispatch({
        type: ADD_USER_DATA,
        payload: { phone: formattedPhone },
      });
    })
    .catch((error) => {
      const { code, message, details } = error;
      console.log(code, message, details);
      dispatch({ type: SET_ERRORS, payload: { phone: message } });
    });
};

export const checkOTP = (phone, OTP) => async (dispatch) => {
  const check = functions.httpsCallable("checkOTP");

  await check({ phone, OTP })
    .then((result) => {
      dispatch({ type: ADD_USER_DATA, payload: { phone } });
      dispatch({ type: CLEAR_ERRORS });
      updatePrivateDoc({ phone }).catch((err) =>
        dispatch({
          type: SET_ERRORS,
          payload: {
            uploadError: err.message,
          },
        })
      );
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: { OTP: "One-Time Password is not valid" },
      });
    });
};

// Adds geohash and coordinates to firestore
export const addLocation = (latitude, longitude) => async (dispatch) => {
  const hash = geohash.encode(latitude, longitude);
  return db
    .collection("private")
    .doc(uid)
    .set(
      {
        latitude,
        longitude,
        geohash: hash,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Successfully added location to database");
      dispatch({ type: CLEAR_ERRORS });
      return true;
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: { location: err.message } });
      return false;
    });
};

export const getInstagramHandle = (authCode) => async (dispatch) => {
  const getInstagram = functions.httpsCallable("getInstagram");

  await getInstagram({ code: authCode })
    .then((result) => {
      const handle = result.data.handle;
      dispatch({
        type: ADD_USER_DATA,
        payload: { socialMediaHandles: { instagram: handle } },
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((error) => {
      const { code, message, details } = error;
      console.log(code, message, details);
      dispatch({ type: SET_ERRORS, payload: { instagram: code } });
    });
};

export const addInstagramHandle = (handle) => async (dispatch) => {
  const data = {
    socialMediaHandles: {
      instagram: handle,
    },
  };
  updatePublicDoc(data)
    .then(() => dispatch({ type: CLEAR_ERRORS }))
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: {
          uploadError: err.message,
        },
      })
    );
};

export const setProfile = (publicData, privateData) => async (dispatch) => {
  updatePublicDoc(publicData)
    .then(() => {
      updatePrivateDoc(privateData);
    })
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: {
          uploadError: err.message,
        },
      });
      dispatch({ type: SET_UNAUTHENTICATED });
    });
};
