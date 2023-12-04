import { createEffect, type Component } from "solid-js";
import { Router, useLocation, useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import SessionProvider from "./components/sessionProvider";
import { Toaster } from "./components/ui/toast";

const App: Component = () => {
	const Route = useRoutes(routes);
	const location = useLocation();

	createEffect(() => {
		console.log(location.pathname);
	});

	return (
		<>
			<main class="w-screen min-h-screen grid place-items-center">
				<SessionProvider>
					<Route />
				</SessionProvider>
			</main>
			<Toaster />
		</>
	);
};

export default App;
