import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth, functions, timeStamp } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateSignup, validateLogin } from "../../utils/validators";

const initialState = {
  loading: false,
  authenticated: null,
  errors: {},
  notifications: [],
  filterSettings: {
    maxGrade: 12,
    minGrade: 9,
    radius: 0,
    sameSchool: "yes",
    sharedInterest: null,
  },
  friendRequests: [],
  friends: [],
  firstName: "",
  grade: 9,
  interests: [],
  school: "",
  location: {
    geoHash: "",
    latitude: 0,
    longitude: 0,
  },
  socialMediaHandles: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAuthenticated(state, action) {
      state.authenticated = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_LOADING:
//       return {
//         ...state,
//         loading: true,
//       };
//     case SET_AUTHENTICATED:
//       return {
//         ...state,
//         loading: false,
//         authenticated: true,
//       };
//     case SET_UNAUTHENTICATED:
//       return {
//         ...state,
//         loading: false,
//         authenticated: false,
//       };
//     case SET_ERRORS:
//       return {
//         ...state,
//         errors: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         errors: {},
//       };
//     case SET_USER:
//       return {
//         authenticated: true,
//         loading: false,
//         ...action.payload,
//       };
//     case LOADING_USER:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ADD_USER_DATA:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// }

export const { setLoading, setData, setErrors, setAuthenticated } =
  userSlice.actions;

export default userSlice.reducer;
