import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db, auth } from "../../firebase/config";
import {
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_ERRORS,
  ADD_USER_DATA,
} from "../types";
import { validateSignup, validateLogin } from "../../utils/validators";

export const tryLocalLogin = () => async (dispatch) => {
  let uid = await AsyncStorage.getItem("uid");
  if (uid) {
    dispatch({ type: ADD_USER_DATA, payload: { uid } });
    dispatch({ type: SET_AUTHENTICATED });
  }
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
    let uid;
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        uid = auth.currentUser.uid;
        AsyncStorage.setItem("uid", uid);
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
              dispatch({ type: SET_AUTHENTICATED });
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
    let uid;
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        uid = auth.currentUser.uid;
        AsyncStorage.setItem("uid", uid);
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
  let formattedPhone, errors;
  const token = auth.currentUser.getIdToken();

  await axios({
    method: "post",
    url: "https://us-central1-meetup-462d1.cloudfunctions.net/api/sendOTP",
    data: { phone },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) formattedPhone = response.data.phone;
    else errors = response.data;
  });

  if (errors)
    dispatch({
      type: SET_ERRORS,
      payload: { phone: "Phone number is not valid" },
    });
  else dispatch({ type: ADD_USER_DATA, payload: { phone: formattedPhone } });
};

export const checkOTP = (phone, OTP) => async (dispatch) => {
  let errors;
  const token = auth.currentUser.getIdToken();
  let uid = await AsyncStorage.getItem("uid");

  await axios({
    method: "post",
    url: "https://us-central1-meetup-462d1.cloudfunctions.net/api/checkOTP",
    data: { phone, OTP },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) errors = response.data;
  });

  if (!errors) {
    db.doc(`/private/${uid}`)
      .update({ phone })
      .then(() => {
        dispatch({ type: ADD_USER_DATA, payload: { phone } });
        dispatch({ type: CLEAR_ERRORS });
      });
  } else
    dispatch({
      type: SET_ERRORS,
      payload: { OTP: "One-Time Password is not valid" },
    });
};
