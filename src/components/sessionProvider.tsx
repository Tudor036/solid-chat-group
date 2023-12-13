import { ParentComponent, createContext, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { supabase } from "~/lib/supabase/client";
import {
	AuthContextError,
	AuthContextInit,
	AuthContextLoggedIn,
} from "~/lib/types";
import { createOnAuthStateChangedHandler } from "~/lib/supabase/auth";

type AuthContextType = AuthContextInit | AuthContextLoggedIn | AuthContextError;

const initialContextValue: AuthContextType = {
	session: null,
	user: null,
	loading: true,
	error: null,
};

export const AuthContext = createContext<AuthContextType>(initialContextValue);

const AuthProvider: ParentComponent = (props) => {
	const [context, setContext] = createStore(initialContextValue);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			createOnAuthStateChangedHandler([setContext])
		);

		onCleanup(() => {
			subscription.unsubscribe();
		});
	});

	return (
		<AuthContext.Provider value={context}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
