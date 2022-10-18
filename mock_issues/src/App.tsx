import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import styled from "styled-components";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    font-family: apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  }

  #root {
    min-height: 100vh;
    padding: 60px 0 115px;
    position: relative;

    @media screen and (min-width: 768px) {
      padding: 60px 0 208px;
    }
  }
`;

function App() {
	const user = useSelector((state: RootState) => state.supaBaseInfo.user);

	return (
		<>
			<Provider store={store}>
				<Reset />
				<GlobalStyle />

				<Header />
				{user ? (
					<Outlet />
				) : (
					<WelcomeBox>
						<h1>
							Welcome to GitHub Issues
							<br />
							Please Sign In To View Data
						</h1>
					</WelcomeBox>
				)}
				<Footer />
			</Provider>
		</>
	);
}

export default App;

const WelcomeBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 40px;
	font-weight: 600;
	text-align: center;
`;
