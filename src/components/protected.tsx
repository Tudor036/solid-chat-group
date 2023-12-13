import { Navigate } from "@solidjs/router";
import { Match, ParentComponent, Show, Switch } from "solid-js";
import { matchRoute } from "~/lib/utils";
import useAuth from "~/store/useAuth";

const WithOnboarding: ParentComponent = (props) => {
	const [ctx] = useAuth();
	const isOnboardingRoute = matchRoute("/onboarding");

	return (
		<Switch fallback={props.children}>
			<Match
				when={isOnboardingRoute && !ctx.user()?.user_metadata.onboarded}
			>
				{props.children}
			</Match>
			<Match
				when={
					!isOnboardingRoute && !ctx.user()?.user_metadata.onboarded
				}
			>
				<Navigate href="/onboarding" />
			</Match>
			<Match
				when={isOnboardingRoute && ctx.user()?.user_metadata.onboarded}
			>
				<Navigate href="/profile" />
			</Match>
		</Switch>
	);
};

const Protected: ParentComponent = (props) => {
	const [ctx] = useAuth();
	const isAuthRoute = matchRoute("/auth");

	return (
		<Show when={!ctx.loading()} fallback={<h1>Loading...</h1>}>
			<Switch
				fallback={<WithOnboarding>{props.children}</WithOnboarding>}
			>
				<Match when={isAuthRoute && !ctx.session()}>
					{props.children}
				</Match>
				<Match when={isAuthRoute && ctx.session()}>
					<Navigate href="/profile" />
				</Match>
				<Match when={!isAuthRoute && !ctx.session()}>
					<Navigate href="/auth" />
				</Match>
			</Switch>
		</Show>
	);
};

export default Protected;
