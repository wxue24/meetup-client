import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  ADD_USER_DATA,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  errors: {},
  notifications: [],
  filterSettings: {},
  firstName: "",
  grade: "",
  handle: "",
  interests: [],
  school: "",
  location: {},
  socialMediaHandles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
