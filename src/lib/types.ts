import { Session, User } from "@supabase/supabase-js";
import { AppError } from "./error";

export type AuthContextInit = {
	session: null;
	user: null;
	loading: true;
	error: null;
};

export type AuthContextLoggedIn = {
	session: Session;
	user: User;
	loading: boolean;
	error: null;
};

export type AuthContextError = {
	session: null;
	user: null;
	loading: boolean;
	error: AppError;
};

export type AuthContextType =
	| AuthContextInit
	| AuthContextError
	| AuthContextLoggedIn;
