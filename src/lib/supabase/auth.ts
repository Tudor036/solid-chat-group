import { AuthContextType } from "../types";
import { supabase } from "./client";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { SetStoreFunction, produce } from "solid-js/store";
import { useLocation, useMatch, useNavigate } from "@solidjs/router";
import { showToast } from "~/components/ui/toast";
import useAuth from "~/store/useAuth";

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

export const createOnAuthStateChangedHandler = ([setContext]: [
	SetStoreFunction<AuthContextType>
]) => {
	const [context] = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const setAuth = (session: Session, user: User) => {
		setContext(
			produce((state) => {
				state.loading = false;
				state.session = session;
				state.user = user;
			})
		);
	};

	const matchAuth = useMatch(() => "/auth");

	const handlerFuncObject: Record<AuthChangeEvent, () => void> = {
		INITIAL_SESSION: () => {
			if (!context.session() && !matchAuth()) {
				navigate("/auth", { replace: true });
			}
		},
		SIGNED_IN: () => {
			if (!context.user()?.user_metadata.onboarded) {
				navigate("/onboarding", { replace: true });
			} else if (matchAuth()) {
				navigate("/profile", { replace: true });
			}
		},
		SIGNED_OUT: () => {
			navigate("/auth", { replace: true });
		},
		TOKEN_REFRESHED: () => {},
		USER_UPDATED: async () => {
			const { data, error } = await supabase.auth.refreshSession();

			if (error) {
				showToast({
					title: "Error",
					description: error.message,
				});
				return;
			}

			setAuth(data.session, data.user);
			navigate("/profile", {
				replace: true,
			});
		},
		MFA_CHALLENGE_VERIFIED: () => {},
		PASSWORD_RECOVERY: () => {},
	};

	return async (event: AuthChangeEvent, session: Session) => {
		let user = null;

		if (session) {
			const { data } = await supabase.auth.getUser(session.access_token);
			user = data.user;
		}

		setAuth(session, user);
		handlerFuncObject[event]();
	};
};
