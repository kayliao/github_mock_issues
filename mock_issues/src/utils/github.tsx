import { supabase } from "../supabase/Client";

const github = {
	async checkUser() {
		/* if a user is signed in, update local state */
		const user = supabase.auth.user();
		const session = supabase.auth.session();
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
	},
	async signOut() {
		/* sign the user out */
		await supabase.auth.signOut();
		localStorage.removeItem("supabaseSession");
		localStorage.removeItem("currentRepoInfo");
		localStorage.removeItem("supabaseUser");
		return null;
	},
};

export default github;
