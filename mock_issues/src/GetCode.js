import { json, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function GetCode() {
	const [searchParams] = useSearchParams();
	const codeNumber = searchParams.get("code");

	useEffect(() => {
		// async function axiosposting() {
		// 	const axios = require("axios");
		// 	const oauth = require("axios-oauth-client");
		// 	const getAuthorizationCode = oauth.client(axios.create(), {
		// 		url: "https://oauth.com/2.0/token",
		// 		grant_type: "client_credentials",
		// 		client_id: "824b5f821175b91c7dfb",
		// 		client_secret: "abb078ddd13bd3bd1d163f78ed03e51a0fac1167",
		// 		// redirect_uri: '...',
		// 		code: codeNumber,
		// 		// scope: 'baz',
		// 	});

		// 	const auth = await getAuthorizationCode();
		// 	console.log(auth);
		// }
		// axiosposting();
		async function testing() {
			const result = await fetch(
				`https://github.com/login/oauth/access_token?client_id=824b5f821175b91c7dfb&client_secret=abb078ddd13bd3bd1d163f78ed03e51a0fac1167&code=${codeNumber}`,
				{
					method: "POST",
					mode: "no-cors",
				}
			);
			const res = await result.json();
			console.log(res);
		}
		testing();
	}, []);

	return <></>;
}

export default GetCode;
