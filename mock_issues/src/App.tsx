import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

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
	return (
		<>
			<Provider store={store}>
				<Reset />
				<GlobalStyle />

				<Header />
				<Outlet />

				<Footer />
			</Provider>
		</>
	);
}

export default App;
