import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector } from "./shared/redux/hooks";

import MainNavigation from "./components/Navigation/MainNavigation";
import User from "./pages/user/User";
import Myapp from "./pages/app/UserApp";
import NewApp from "./pages/app/NewApp";
import EditApp from "./pages/app/EditApp";
import Footer from "./components/Footer/Footer";

const App = () => {
	const auth = useAppSelector((state) => state.auth);
	const { isLoggedIn } = auth;
	let routes;
	if (isLoggedIn) {
		routes = (
			<Routes>
				<Route path="/" element={<User />} />
				<Route path="/:userId/app" element={<Myapp />} />
				<Route path="/app/new" element={<NewApp />} />
				<Route path="/app/:appId" element={<EditApp />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/" element={<User />} />
				<Route path="/*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	}

	return (
		<>
			<MainNavigation />
			<main>{routes}</main>
			<Footer />
		</>
	);
};

export default App;
