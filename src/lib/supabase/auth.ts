import useAuth from "~/store/useAuth";
import { supabase } from "./client";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

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

const handlerFuncs: Record<AuthChangeEvent, () => void> = {
	INITIAL_SESSION: () => {},
	SIGNED_IN: () => {},
	SIGNED_OUT: () => {},
	TOKEN_REFRESHED: () => {},
	USER_UPDATED: () => {},
	MFA_CHALLENGE_VERIFIED: () => {},
	PASSWORD_RECOVERY: () => {},
};

export const onAuthStateChangedHandler = () => {
	const [context] = useAuth();

	return async (event: AuthChangeEvent, session: Session) => {
		handlerFuncs?.[event]();
	};
};
