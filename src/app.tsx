import type { Component } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import SessionProvider from "./components/sessionProvider";

const App: Component = () => {
	const Route = useRoutes(routes);

	return (
		<main class="w-screen min-h-screen grid place-items-center">
			<SessionProvider>
				<Route />
			</SessionProvider>
		</main>
	);
};

export default App;
