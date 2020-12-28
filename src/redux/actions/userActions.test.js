import mockStore from "../../../__mocks__/redux-mock-store";
import {
  validatePhone,
  checkOTP,
  getInstagramHandle,
} from "./userActions";
import { auth } from "../../firebase/config";

const initialState = {
  loading: false,
  errors: {},
  notifications: [],
  filterSettings: {},
  friendRequests: [],
  friends: [],
  firstName: "",
  grade: null,
  interests: [],
  school: "",
  location: {},
  socialMediaHandles: {},
};

describe("OTP actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  // it("validates number and sends OTP", async () => {
  //   await store.dispatch(validatePhone("9099649258")).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "ADD_USER_DATA",
  //       payload: { phone: "+19099649258" },
  //     });
  //   });
  // });

  // it("checks for invalid number", async () => {
  //   await store.dispatch(validatePhone("0000000000")).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "SET_ERRORS",
  //       payload: { phone: "Number is not valid" },
  //     });
  //   });
  // });

  // it("verifies correct OTP", async () => {
  //   const phone = "+19099649258";
  //   const OTP = "885247";

  //   await store.dispatch(checkOTP(phone, OTP)).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "ADD_USER_DATA",
  //       payload: { phone: "+19099649258" },
  //     });
  //   });
  // });

  // it("invalidates incorrect OTP", async () => {
  //   const data = {
  //     phone: "9099649258",
  //     OTP: "000000",
  //   };
  //   await store.dispatch(checkOTP(data)).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "SET_ERRORS",
  //       payload: { OTP: "One-Time Password is not valid" },
  //     });
  //   });
  // });
});

describe("Instagram auth actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  // it("doesn't get instagram handle", async () => {
  //   // expired code
  //   const authCode =
  //     "AQCo-1C6DWOlstIXbXeuDhjn7laOI8BAeZi5hmhZJWn8CGIu1d4K0NBup3uWl4LEWX-HaePRh7naaFJ54l80ylC78r5H2_pNVj9zcgyGlVtUd416qA_cHprUoj-EdBPXP_Uq2253M1_qHKyROttqAkkYSrtc4I1DAfQVusMBaRValgJL8eensxU8FgCIGZ0Tc4Ph1hvyo8OmyunQJxIjV40H1yylwfneIMVrP1hpfcPZcA";
  //   await store.dispatch(getInstagramHandle(authCode)).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "SET_ERRORS",
  //       payload: { instagram: "permission-denied" },
  //     });
  //   });
  // });

  // it("gets instagram handle", async () => {
  //   // current code
  //   const authCode =
  //     "AQCjk3BplJUFfBIPzwY9W2YBJSfjiH2AVSPw8p-jwgoKWLS9PSoXOOEI2J_7Fb2ggBmBKRGCqQhD1YLaK3mVjmskxu6GYuAVhp8tuC0MI9_dX_PN7Y6Bu5SSRcSYUJDz8jB6qXog1mJ78JV_iyXxKFIVTE0LLdNXKI04RnAOnQXmcW0RgzdHkaAjb6oOrLjTtqrT7zbCGsT2X32eYrezc0hNm2_ZxpBg9H6zGrvhp-eNlw";
  //   await store.dispatch(getInstagramHandle(authCode)).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "ADD_USER_DATA",
  //       payload: { socialMediaHandles: { instagram: "wxue.2020" } },
  //     });
  //   });
  // });
});

// describe("Firebase actions", () => {

//   beforeAll(() => {
//     // Add auth.login() to firebase config
//   });

//   test("user merges data to private doc", async () => {
    
//   });

//   test("user merges data to public doc", async() => {

//   })
// });
