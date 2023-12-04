import type { Component } from "solid-js";
import { Router, useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import SessionProvider from "./components/sessionProvider";
import { Toaster } from "./components/ui/toast";

const App: Component = () => {
	const Route = useRoutes(routes);

	return (
		<Router>
			<main class="w-screen min-h-screen grid place-items-center">
				<SessionProvider>
					<Route />
				</SessionProvider>
			</main>
			<Toaster />
		</Router>
	);
};

export default App;
