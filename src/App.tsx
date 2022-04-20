import React from "react";
import img from "./images/Screen Shot 2022-04-19 at 9.43.24.png";
const Hello = React.lazy(() => import("./components/Hello"));
const Goodbye = React.lazy(() => import("./components/Goodbye"));

const App = () => {
	console.log("hello");
	return (
		<>
			<Hello />
			<Goodbye />
			<h1>Hello</h1>
			<img src={img} />
		</>
	);
};

export default App;
