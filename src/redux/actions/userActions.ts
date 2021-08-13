import { AppThunk } from "./../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import geohash from "ngeohash";

import { db, auth, functions, timeStamp } from "../../firebase/config";

import { validateSignup, validateLogin } from "../../utils/validators";
import {
  setLoading,
  setData,
  setErrors,
  setAuthenticated,
} from "../reducers/userSlice";
import store from "../store";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

// const updatePrivateDoc = (data) => {
//   if (!uid) uid = auth.currentUser.uid;
//   return db
//     .doc(`/private/${uid}`)
//     .set(data, { merge: true })
//     .catch((err) => {
//       console.log(err);
//       throw new Error("Can't upload to private database");
//     });
// };

// const updatePublicDoc = (data) => {
//   if (!uid) uid = auth.currentUser.uid;
//   return db
//     .doc(`/users/${uid}`)
//     .set(data, { merge: true })
//     .catch((err) => {
//       console.log(err);
//       throw new Error("Can't upload to public database");
//     });
// };

// Calculate the upper and lower boundary geohashes for
// a given latitude, longitude, and distance in miles
// const getGeohashRange = (
//   latitude,
//   longitude,
//   distance // miles
// ) => {
//   const lat = 0.0144927536231884; // degrees latitude per mile
//   const lon = 0.0181818181818182; // degrees longitude per mile

//   const lowerLat = latitude - lat * distance;
//   const lowerLon = longitude - lon * distance;

//   const upperLat = latitude + lat * distance;
//   const upperLon = longitude + lon * distance;

//   const lower = geohash.encode(lowerLat, lowerLon);
//   const upper = geohash.encode(upperLat, upperLon);
//   console.log("hi");
//   console.log(lower, upper);
//   return {
//     lower,
//     upper,
//   };
// };

export const tryLocalLogin = (): AppThunk => async (dispatch) => {
  // await auth.signInWithEmailAndPassword("user1@email.com", "password"); //Test code
  let user = auth.currentUser;
  if (user) {
    dispatch(setData({ uid: user.uid }));
    dispatch(setAuthenticated(true));
  } else {
    let [[email, password]] = await AsyncStorage.multiGet([
      "email",
      "password",
    ]);
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(setData({ uid: auth.currentUser?.uid }));
          dispatch(setAuthenticated(true));
        })
        .catch((err) => {
          console.log("Local login failed", err.message);
          dispatch(setAuthenticated(false));
        });
    } else {
      console.log("Email and password not saved locally");
      dispatch(setAuthenticated(false));
    }
  }
};

// export const signup =
//   (email, password, confirmPassword, handle) => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS });
//     const { errors, valid } = validateSignup(
//       email,
//       password,
//       confirmPassword,
//       handle
//     );
//     if (!valid) dispatch({ type: SET_ERRORS, payload: errors });
//     else {
//       return auth
//         .createUserWithEmailAndPassword(email, password)
//         .then(() => {
//           uid = auth.currentUser.uid;
//           AsyncStorage.setItem("uid", uid);
//           AsyncStorage.setItem("email", email);
//           AsyncStorage.setItem("password", password);
//           return db.doc(`/users/${uid}`).get();
//         })
//         .then((doc) => {
//           if (doc.exists) {
//             return dispatch({
//               type: SET_ERRORS,
//               payload: { handle: "This username is already taken" },
//             });
//           } else {
//             updatePublicDoc({ handle }).then(() => {
//               dispatch({ type: CLEAR_ERRORS });
//             });
//           }
//         })
//         .catch((err) => {
//           console.log(err.message);
//           // TODO handle different errors
//           dispatch({ type: SET_ERRORS, payload: { general: err.message } });
//         });
//     }
//   };

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setErrors({}));
    const { errors, valid } = validateLogin({ email, password });
    if (!valid) dispatch(setErrors(errors));
    else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          let uid = data.user!.uid;
          AsyncStorage.multiSet([
            ["uid", uid],
            ["email", email],
            ["password", password],
          ]);

          dispatch(setAuthenticated(true));
          dispatch(setErrors({}));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setErrors({ general: err.message }));
        });
    }
  };

export const signOut = (): AppThunk => async (dispatch) => {
  auth
    .signOut()
    .then(() => {
      AsyncStorage.multiRemove(["uid", "email", "password"]);
      dispatch(setAuthenticated(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const switchAuthScreen = () => (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };

// export const validatePhone = (phone) => async (dispatch) => {
//   const sendOTP = functions.httpsCallable("sendOTP");

//   await sendOTP({ phone })
//     .then((result) => {
//       const formattedPhone = result.data.phone;
//       dispatch({
//         type: ADD_USER_DATA,
//         payload: { phone: formattedPhone },
//       });
//     })
//     .catch((error) => {
//       const { code, message, details } = error;
//       console.log(code, message, details);
//       dispatch({ type: SET_ERRORS, payload: { phone: message } });
//     });
// };

// export const checkOTP = (phone, OTP) => async (dispatch) => {
//   const check = functions.httpsCallable("checkOTP");

//   await check({ phone, OTP })
//     .then((result) => {
//       dispatch({ type: ADD_USER_DATA, payload: { phone } });
//       dispatch({ type: CLEAR_ERRORS });
//       updatePrivateDoc({ phone }).catch((err) =>
//         dispatch({
//           type: SET_ERRORS,
//           payload: {
//             uploadError: err.message,
//           },
//         })
//       );
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: { OTP: "One-Time Password is not valid" },
//       });
//     });
// };

// // Adds geohash and coordinates to firestore
// export const addLocation = (latitude, longitude) => async (dispatch) => {
//   const hash = geohash.encode(latitude, longitude);
//   const data = {
//     location: {
//       latitude,
//       longitude,
//       geohash: hash,
//     },
//   };

//   return updatePrivateDoc(data)
//     .then(() => {
//       console.log("Successfully added location to database");
//       dispatch({ type: CLEAR_ERRORS });
//       return true;
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({ type: SET_ERRORS, payload: { location: err.message } });
//       return false;
//     });
// };

// export const getInstagramHandle = (authCode) => async (dispatch) => {
//   const getInstagram = functions.httpsCallable("getInstagram");

//   await getInstagram({ code: authCode })
//     .then((result) => {
//       const handle = result.data.handle;
//       dispatch({
//         type: ADD_USER_DATA,
//         payload: { socialMediaHandles: { instagram: handle } },
//       });
//       dispatch({ type: CLEAR_ERRORS });
//     })
//     .catch((error) => {
//       const { code, message, details } = error;
//       console.log(code, message, details);
//       dispatch({ type: SET_ERRORS, payload: { instagram: code } });
//     });
// };

// export const addInstagramHandle = (handle) => async (dispatch) => {
//   const data = {
//     socialMediaHandles: {
//       instagram: handle,
//     },
//   };
//   updatePublicDoc(data)
//     .then(() => dispatch({ type: CLEAR_ERRORS }))
//     .catch((err) =>
//       dispatch({
//         type: SET_ERRORS,
//         payload: {
//           uploadError: err.message,
//         },
//       })
//     );
// };

// export const setProfile = (publicData, privateData) => async (dispatch) => {
//   updatePublicDoc(publicData)
//     .then(() => {
//       updatePrivateDoc(privateData);
//     })
//     .then(() => {
//       dispatch({ type: CLEAR_ERRORS });
//       dispatch({ type: SET_AUTHENTICATED });
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: {
//           uploadError: err.message,
//         },
//       });
//       dispatch({ type: SET_UNAUTHENTICATED });
//     });
// };

// export const testAddData = () => async (dispatch) => {
//   await auth.signInWithEmailAndPassword("user2@email.com", "password");
//   const uid = auth.currentUser.uid;
//   //0.015 degrees is 1 mile
//   const latitude = 34.08536481081745;
//   const longitude = -117.75371831638904;

//   const userData = {
//     handle: "user2",
//     firstName: "John",
//     school: "Claremont High",
//     grade: 11,
//     lastUpdated: timeStamp.now(),
//     interests: [
//       // Limit 10 if using firebase
//       { name: "Tennis", type: "team_sports", code: "006" },
//       { name: "Soccer", type: "team_sports", code: "001" },
//       { name: "Basketball", type: "team_sports", code: "002" },
//       { name: "Guitar", type: "music", code: "101" },
//       { name: "Piano", type: "music", code: "102" },
//     ],
//     socialMediaHandles: {
//       instagram: "john123",
//     },
//   };

//   const notificationData = {
//     type: "friend-req",
//     recipient: "user2",
//     sender: "user3",
//     senderName: "Will",
//     read: false, //true or false
//     createdAt: timeStamp.now(),
//   };
//   const privateData = {
//     email: "user2@email.com",
//     phone: "+12345678901",
//     location: {
//       geoHash: geohash.encode(latitude, longitude),
//       latitude,
//       longitude,
//     },
//     friends: [
//       {
//         name: "Tim",
//         handle: "user1",
//         sharedInterests: ["001", "502"],
//         grade: 11,
//         school: "Claremont High",
//         socialMedia: {
//           instagram: "tim123",
//         },
//       },
//     ],
//     friendRequests: [
//       {
//         sender: "Will",
//         handle: "user3",
//         sharedInterests: ["001", "502"],
//         grade: 11,
//         school: "Claremont High",
//         socialMedia: {
//           instagram: "will123",
//         },
//       },
//     ],
//     filterSettings: {
//       maxGrade: 12,
//       minGrade: 9,
//       sameSchool: "yes",
//       radius: 1, // 1,2,3,4 in miles (0 is any)
//       sharedInterest: "001", //specific interest code in string or null (any)
//     },
//     notificationPreferences: {
//       newFriendRequest: true, // off, on
//       newRecommendations: true, // off, daily
//     },
//   };

//   db.collection("users")
//     .doc(uid)
//     .set(userData)
//     .then(() => db.collection("private").doc(uid).set(privateData))
//     .then(() => db.collection("notifications").doc(uid).set(notificationData))
//     .then(() => console.log("success"))
//     .catch((err) => console.log(err));
// };

// export const getUsersWithinRadius = () => async (dispatch) => {
//   // test data
//   const lat = 34.09536481081745;
//   const lon = -117.74371831638904;
//   const range = getGeohashRange(lat, lon, 10);
//   // Calls firebase function to get closest 200 users
// };

// export const testFunction = () => {
//   const lat = 34.09536481081745;
//   const lon = -117.74371831638904;
//   const range = getGeohashRange(lat, lon, 10);
//   return range;
// };
