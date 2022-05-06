import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector } from "./redux/hooks";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserApps from "./apps/pages/UsersApp";
import Myapp from "./apps/pages/Myapp";
import NewApp from "./apps/pages/NewApp";
import EditApp from "./apps/pages/EditApp";
import Footer from "./shared/components/Footer/Footer";

const App = () => {
	const auth = useAppSelector((state) => state.auth);
	const { isLoggedIn } = auth;
	let routes;
	if (isLoggedIn) {
		routes = (
			<Routes>
				<Route path="/" element={<UserApps />} />
				<Route path="/:userId/app" element={<Myapp />} />
				<Route path="/app/new" element={<NewApp />} />
				<Route path="/app/:appId" element={<EditApp />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/" element={<UserApps />} />
				<Route path="*" element={<Navigate to="/" replace />} />
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
