import { supabase } from "../supabase/Client";

const github = {
	async checkUser() {
		/* if a user is signed in, update local state */
		const user = supabase.auth.user();
		const session = supabase.auth.session();
		console.log(user);
		console.log(session);
		return { user, session };
	},
	async signInWithGithub() {
		/*authenticate with GitHub */
		const { user, session } = await supabase.auth.signIn(
			{
				provider: "github",
			},
			{
				scopes: "repo gist notifications",
			}
		);

		console.log("signin", user);
		console.log(session);
	},
	async signOut() {
		/* sign the user out */
		await supabase.auth.signOut();
		return null;
	},
};

export default github;
