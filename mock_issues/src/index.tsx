import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Repo from "./Repo";
import Error from "pages/Error/Error";
import LabelManagement from "./pages/Label/LabelManagement";
import IssuesListManagement from "pages/IssuesList/IssuesListManagement";
import UsersLists from "pages/SearchUser/UsersLists";
import RepoSearched from "pages/SearchUser/RepoSearched";
import NewIssuePage from "pages/NewIssue/NewIssuePage";
import IssueInfo from "pages/IssueInfo/IssueInfo";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";

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
				<Route path="/SearchUsers/:searchname" element={<UsersLists />} />
				<Route path="/:username/repos" element={<RepoSearched />} />

				<Route
					path="/:username/:reponame/labels"
					element={<LabelManagement />}
				/>
				<Route
					path="/:username/:reponame/issues"
					element={<IssuesListManagement />}
				/>
				<Route
					path="/:username/:reponame/issues/new"
					element={<NewIssuePage />}
				/>
				<Route
					path="/:username/:reponame/issues/:issuenumber"
					element={<IssueInfo />}
				/>
				<Route path="/error/:status/:message" element={<Error />} />
				<Route path="*" element={<Error />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
