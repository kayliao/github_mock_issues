import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Repo from "./Repo";

import Oauth from "./Oauth.js";

import GetCode from "./GetCode";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="/" element={<Repo />} />
				{/* <Route path="/login/oauth2/code/github" element={<GetCode />}></Route> */}
			</Route>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
