import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages";
import Error from "./pages/error";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/auth",
		component: lazy(() => import("./pages/auth")),
	},
	{
		path: "/onboarding",
		component: lazy(() => import("./pages/onboarding")),
	},
	{
		path: "/profile",
		component: lazy(() => import("./pages/profile/index")),
	},
	{
		path: "/chat",
		component: lazy(() => import("./pages/chat/layout")),
		children: [
			{
				path: "/",
				component: lazy(() => import("./pages/chat/index")),
			},
			{
				path: "/:id",
				component: lazy(() => import("./pages/chat/[id]/index")),
			},
		],
	},
	{
		path: "**",
		component: Error,
	},
];
