import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { supabase } from "./Client";

// import store from "./store/store";
import { useSelector } from "react-redux";
// import { StateType } from "./reducer/actionList";

// import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
// import { Provider } from "react-redux";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
	return (
		<>
			<Reset />
			{/* <GlobalStyle /> */}

			<Header />
			<Outlet />

			{/* <Footer /> */}
		</>
	);
}

export default App;
