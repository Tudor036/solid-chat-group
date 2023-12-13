import { useLocation } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { AppError } from "~/lib/error";

const NotFound: Component = () => (
	<section class="text-gray-700 p-8">
		<h1 class="text-2xl font-bold">404: Not Found</h1>
	</section>
);

export default function Error() {
	const location = useLocation<{ error?: AppError }>();
	return (
		<Show when={location.state} fallback={<NotFound />}>
			<section class="text-gray-700 p-8">
				<h1 class="text-2xl font-bold">
					{location.state?.error?.status &&
						`${location.state.error.status}:`}{" "}
					{location.state?.error?.message}
				</h1>
			</section>
		</Show>
	);
}
