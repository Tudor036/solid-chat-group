import { type Component, createRenderEffect } from "solid-js";
import { useMatch, useNavigate, useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import SessionProvider from "./components/sessionProvider";
import { Toaster } from "./components/ui/toast";
import useConnection from "./store/useConnection";
import ThemeProvider from "./components/themeProvider";

const App: Component = () => {
	const Route = useRoutes(routes);
	const matchConnectionError = useMatch(() => "/service-unavailable/error");
	const navigate = useNavigate();
	const connection = useConnection();

	createRenderEffect(() => {
		if (!connection.online && !matchConnectionError()) {
			navigate("/service-unavailable/error", {
				state: { error: new Error("Service unavailable 😞") },
			});
		} else if (connection.online && matchConnectionError()) {
			navigate("/");
		}
	});

	return (
		<ThemeProvider>
			<SessionProvider>
				<main class="w-screen min-h-screen grid place-items-center">
					<Route />
					<Toaster />
				</main>
			</SessionProvider>
		</ThemeProvider>
	);
};

export default App;
