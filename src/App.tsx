import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector } from "./shared/redux/hooks";

import MainNavigation from "./components/Navigation/MainNavigation";
import LoadingScreen from "./components/UIElements/LoadingScreen";
const User = React.lazy(() => import("./pages/user/User"));
const Myapp = React.lazy(() => import("./pages/app/UserApp"));
const NewApp = React.lazy(() => import("./pages/app/NewApp"));
const EditApp = React.lazy(() => import("./pages/app/EditApp"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));

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
			<React.Suspense fallback={<LoadingScreen />}>
				<MainNavigation />
				<main>{routes}</main>
				<Footer />
			</React.Suspense>
		</>
	);
};

export default App;
