import { createRenderEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

type NetworkStoreType = {
	online: boolean;
};

const initialStoreValue = {
	online: true,
};

export default function useConnection() {
	const [connection, setConnection] =
		createStore<NetworkStoreType>(initialStoreValue);

	const checkNetworkStatus = () => {
		const isOnline = window.navigator.onLine;
		setConnection("online", isOnline);
	};

	const handleStatusChange = (e) => {
		const isOnline = e.type === "online";
		setConnection("online", isOnline);
	};

	createRenderEffect(() => {
		checkNetworkStatus();

		window.addEventListener("online", handleStatusChange);
		window.addEventListener("offline", handleStatusChange);

		onCleanup(() => {
			window.removeEventListener("online", handleStatusChange);
			window.removeEventListener("offline", handleStatusChange);
		});
	});

	return connection;
}
