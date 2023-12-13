import { useMatch } from "@solidjs/router";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const matchRoute = (checkedPath: string) =>
	useMatch(() => checkedPath)();
