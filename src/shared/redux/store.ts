import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

export const store = configureStore({
	reducer: { auth: auth.reducer },
});

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
