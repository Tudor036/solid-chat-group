import { Outlet } from "@solidjs/router";
import Header from "~/components/header";
import Sidebar from "~/components/sidebar";

import { Flex } from "~/components/ui/flex";

export default function ChatLayout() {
	return (
		<Flex flexDirection="row" class="w-screen h-screen">
			<Sidebar />
			<section class="w-full h-screen">
				<Header />
				<Outlet />
			</section>
		</Flex>
	);
}
