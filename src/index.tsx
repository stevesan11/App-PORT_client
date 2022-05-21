import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";

import App from "./App";
import "./main.css";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
