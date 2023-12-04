import { Navigate, useMatch } from "@solidjs/router";
import { Match, ParentComponent, Show, Switch } from "solid-js";
import useSession from "~/store/useSession";

const Protected: ParentComponent = (props) => {
	const [ctx] = useSession();
	const match = (checkedPath: string) => useMatch(() => checkedPath)();

	return (
		<Show when={!ctx.loading()} fallback={<h1>Loading...</h1>}>
			<Switch>
				<Match when={match("/auth") && ctx.session()}>
					<Navigate href="/profile" />
				</Match>
				<Match when={!match("/auth") && !ctx.session()}>
					<Navigate href="/auth" />
				</Match>
				<Match
					when={
						(match("/auth") && !ctx.session()) ||
						(!match("/auth") && ctx.session())
					}
				>
					{props.children}
				</Match>
			</Switch>
		</Show>
	);
};

export default Protected;
