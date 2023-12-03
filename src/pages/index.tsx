import { Show } from "solid-js";
import useSession from "~/store/useSession";

export default function Home() {
	const [sessionContext] = useSession();
	return (
		<Show when={!sessionContext.loading} fallback={<p>Loading...</p>}>
			<section>
				<h1>Hello World!</h1>
			</section>
		</Show>
	);
}
