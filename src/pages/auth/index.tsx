import { createSignal } from "solid-js";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Protected from "~/components/protected";
import {
	createForm,
	emailValidator,
	maxLengthValidator,
	minLengthValidator,
	requiredValidator,
} from "solform";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "~/components/ui/toast";
import { Flex } from "~/components/ui/flex";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface AuthFormSchema {
	email: string;
	password: string;
}

type AuthType = "login" | "register";

const authFunc = (type: AuthType, credentials: AuthFormSchema) => {
	const opts = {
		login: () => supabase.auth.signInWithPassword(credentials),
		register: () =>
			supabase.auth.signUp({
				...credentials,
				options: {
					data: {
						onboarding: false,
					},
				},
			}),
	};

	return opts[type]();
};

import { AiOutlineEye, AiOutlineEyeInvisible } from "solid-icons/ai";
import { Accessor, Component, Show } from "solid-js";

type ErrorMessageProps = {
	error?: string;
};

export const ErrorMessage: Component<ErrorMessageProps> = (props) => {
	return (
		<Show when={props.error}>
			<p class="text-red-400 text-sm mr-auto">{props.error}</p>
		</Show>
	);
};

type VisibleIconProps = {
	visible: Accessor<boolean>;
};

export const VisibleIcon: Component<VisibleIconProps> = (props) => {
	return (
		<Show when={props.visible()} fallback={<AiOutlineEyeInvisible />}>
			<AiOutlineEye />
		</Show>
	);
};

export default function Auth() {
	const [showPassword, setShowPassword] = createSignal(false);
	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const [authTab, setAuthTab] = createSignal<AuthType>("login");
	const { register, submit, errors } = createForm<AuthFormSchema>({
		validators: {
			email: [
				requiredValidator("The username is required"),
				emailValidator("Invalid email"),
			],
			password: [
				requiredValidator("The password is required"),
				minLengthValidator(
					8,
					"The password must have at least 8 characters"
				),
				maxLengthValidator(
					30,
					"The password must NOT have more than 30 characters"
				),
			],
		},
		onSubmit: async (credentials) => {
			const { error } = await authFunc(authTab(), credentials);
			if (error) {
				showToast({
					title: "Error",
					description: error.message,
				});
			}
		},
	});

	const setAuthType = (type: AuthType) => () => setAuthTab(type);

	return (
		<Protected>
			<Tabs defaultValue="login" class="space-y-2">
				<TabsList class="grid grid-cols-2 w-full">
					<TabsTrigger value="login" onClick={setAuthType("login")}>
						Login
					</TabsTrigger>
					<TabsTrigger
						value="register"
						onClick={setAuthType("register")}
					>
						Register
					</TabsTrigger>
				</TabsList>
				<Card class="max-w-sm w-full">
					<CardHeader>
						<CardTitle>Chat Group App</CardTitle>
						<CardDescription>
							You'll need to sign in before using the chat
						</CardDescription>
					</CardHeader>
					<CardContent class="w-full space-y-4">
						<form class="space-y-4">
							<Flex
								flexDirection="col"
								justifyContent="start"
								class="space-y-2"
							>
								<Label class="mr-auto">Email</Label>
								<Input {...register("email")} />
								<ErrorMessage error={errors.email} />
							</Flex>
							<Flex
								flexDirection="col"
								justifyContent="start"
								class="space-y-2"
							>
								<Label class="mr-auto">Password</Label>
								<div class="relative w-full">
									<Input
										{...register("password")}
										type={
											showPassword() ? "text" : "password"
										}
									/>
									<Button
										variant="ghost"
										class="absolute top-1/2 -translate-y-1/2 right-1 h-9 w-9"
										onClick={toggleShowPassword}
										type="button"
									>
										<VisibleIcon visible={showPassword} />
									</Button>
								</div>
								<ErrorMessage error={errors.password} />
							</Flex>
							<Button
								type="submit"
								size="sm"
								class="w-full"
								onClick={submit}
							>
								<TabsContent class="mt-0" value="login">
									Login
								</TabsContent>
								<TabsContent class="mt-0" value="register">
									Register
								</TabsContent>
							</Button>
						</form>
					</CardContent>
				</Card>
			</Tabs>
		</Protected>
	);
}
