import { supabase } from "./client";

export const signInWithGoogle = async () => {
	return await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		},
	});
};

export const signInWithGithub = async () => {
	return await supabase.auth.signInWithOAuth({
		provider: "github",
	});
};
