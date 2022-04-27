import React from "react";
import { Routes, Route } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
	return (
		<>
			<MainNavigation />
			<main>
				<Routes>
					<Route path="/allapp" element={<h1>allapp</h1>} />
					<Route path="/userId/myapp" element={<h1>myapp</h1>} />
					<Route path="/userId/add" element={<h1>add</h1>} />
				</Routes>
			</main>
		</>
	);
};

export default App;
