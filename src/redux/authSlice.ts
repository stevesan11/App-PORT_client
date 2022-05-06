import { createSlice } from "@reduxjs/toolkit";

interface authState {
	userId: string;
	isLoggedIn: boolean;
}
const initialState: authState = {
	userId: "",
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, actions) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.isLoggedIn = true;
			state.userId = actions.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.userId = "";
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice;
