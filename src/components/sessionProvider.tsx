import { useMatch, useNavigate } from "@solidjs/router";
import { Session } from "@supabase/supabase-js";
import {
	ParentComponent,
	createContext,
	createEffect,
	onMount,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { AppError } from "~/lib/error";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "./ui/toast";

type SessionContextType =
	| {
			session: Session;
			loading: false;
			error: null;
	  }
	| {
			session: null;
			loading: false;
			error: AppError;
	  }
	| {
			session: null;
			loading: true;
			error: null;
	  };

const initialContextValue = {
	session: null,
	loading: true,
	error: null,
};

export const SessionContext =
	createContext<SessionContextType>(initialContextValue);

const SessionProvider: ParentComponent = (props) => {
	const [context, setContext] = createStore(initialContextValue);
	const navigate = useNavigate();

	const setSession = (session: Session) => {
		setContext(
			produce((state) => {
				state.session = session;
			})
		);
	};

	const matchesAuth = () => {
		const authMatcher = useMatch(() => "/auth");
		return authMatcher();
	};

	onMount(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(event, session);
			if (event === "INITIAL_SESSION" && !session) {
				setSession(session);
				navigate("/auth");
			} else if (event === "SIGNED_IN") {
				if (!context.session) {
					showToast({
						title: "Success",
						description: "Successfully signed in!",
					});
				}

				setSession(session);
				navigate("/profile");
			} else if (event === "SIGNED_OUT") {
				if (context.session) {
					showToast({
						title: "Success",
						description: "Successfully signed out!",
					});
				}

				setSession(session);
				navigate("/auth");
			}
		});
	});

	return (
		<SessionContext.Provider value={context}>
			{props.children}
		</SessionContext.Provider>
	);
};

export default SessionProvider;
