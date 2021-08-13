import {AnyAction, configureStore, ThunkAction} from "@reduxjs/toolkit"

import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Type of thunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export default store;
