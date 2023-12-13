import { Show } from "solid-js";
import { Toggle } from "./ui/toggle";
import { FaSolidSun, FaSolidMoon } from "solid-icons/fa";

export default function Header() {
	return (
		<header class="flex flex-row justify-between w-full p-4">
			<h1 class="uppercase font-semibold text-lg">frontend developers</h1>
			<Toggle onClick={() => {}}>
				{(state) => (
					<Show
						when={state.pressed()}
						fallback={<FaSolidMoon class="text-xl" />}
					>
						<FaSolidSun class="text-xl" />
					</Show>
				)}
			</Toggle>
		</header>
	);
}
