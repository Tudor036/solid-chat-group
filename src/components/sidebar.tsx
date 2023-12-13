import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";

export default function Sidebar() {
	return (
		<aside class="w-[320px] h-screen p-4">
			<header class="flex flex-row justify-between">
				<h1 class="text-xl font-medium">Channels</h1>
				<Dialog>
					<DialogTrigger class="text-xl font-medium">
						<Button variant="outline">+</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>New Channel</DialogHeader>
					</DialogContent>
				</Dialog>
			</header>
		</aside>
	);
}
