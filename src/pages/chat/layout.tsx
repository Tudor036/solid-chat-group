import { Outlet } from "@solidjs/router";

export default function ChatLayout() {
	return (
		<section>
			<h1>Chat Layout</h1>
			<Outlet />
		</section>
	);
}
