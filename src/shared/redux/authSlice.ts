import { createSlice } from "@reduxjs/toolkit";

interface authState {
	userId: string;
	token: string;
	isLoggedIn: boolean;
}
const initialState: authState = {
	userId: "",
	token: "",
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
			state.userId = actions.payload.userId;
			state.token = actions.payload.token;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.userId = "";
			state.token = "";
			state.isLoggedIn = false;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice;
