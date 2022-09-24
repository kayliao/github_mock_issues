import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Repo from "./Repo";
import LabelManagement from "./pages/Label/LabelManagement";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { githubApiSlice } from "./api/githubApiSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={
					<Provider store={store}>
						<App />
					</Provider>
				}
			>
				<Route path="/" element={<Repo />} />
				<Route
					path="/:username/:reponame/labels"
					element={<LabelManagement />}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
