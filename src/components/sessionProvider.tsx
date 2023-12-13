import { ParentComponent, createContext, onCleanup, onMount } from "solid-js";
import { useMatch, useNavigate } from "@solidjs/router";
import { Session, User } from "@supabase/supabase-js";
import { createStore, produce } from "solid-js/store";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "./ui/toast";
import {
	AuthContextError,
	AuthContextInit,
	AuthContextLoggedIn,
} from "~/lib/types";

type AuthContextType = AuthContextInit | AuthContextLoggedIn | AuthContextError;

const initialContextValue: AuthContextType = {
	session: null,
	user: null,
	loading: true,
	error: null,
};

// Create the session context
export const AuthContext = createContext<AuthContextType>(initialContextValue);

// Session provider component
const AuthProvider: ParentComponent = (props) => {
	// Create a store for the context
	const [context, setContext] = createStore(initialContextValue);

	// Solid.js router hooks
	const navigate = useNavigate();
	const matchesRoute = (route: string) => useMatch(() => route)();

	// Helper function to update context
	const setAuth = (session: Session, user: User) =>
		setContext(
			produce((state) => {
				state.loading = false;
				state.session = session;
				state.user = user;
			})
		);

	// Effect hook for handling authentication state changes
	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				let currentUser: User | null = context.user;

				if (session) {
					const { data: userResponse } = await supabase.auth.getUser(
						session.access_token
					);
					currentUser = userResponse?.user || null;
				}

				setAuth(session, currentUser);
				console.log(event, session);

				switch (event) {
					case "INITIAL_SESSION":
						if (!session && !matchesRoute("/auth")) {
							navigate("/auth", { replace: true });
						}
						break;

					case "SIGNED_IN":
						if (!context.user?.user_metadata.onboarded) {
							navigate("/onboarding", { replace: true });
						} else if (matchesRoute("/auth")) {
							navigate("/profile", { replace: true });
						}
						break;

					case "SIGNED_OUT":
						navigate("/auth", { replace: true });
						break;

					case "USER_UPDATED":
						const { data, error } =
							await supabase.auth.refreshSession();

						if (error) {
							showToast({
								title: "Error",
								description: error.message,
							});
							break;
						}
						setContext(
							produce((state) => {
								state.session = data.session;
								state.user = data.user;
							})
						);

						navigate("/profile", {
							replace: true,
						});
						break;

					default:
						break;
				}
			}
		);

		// Cleanup subscription on component unmount
		onCleanup(() => {
			authListener.subscription.unsubscribe();
		});
	});

	// Render the context provider with its children
	return (
		<AuthContext.Provider value={context}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
