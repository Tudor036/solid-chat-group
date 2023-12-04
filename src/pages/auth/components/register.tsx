import {
	createForm,
	emailValidator,
	maxLengthValidator,
	minLengthValidator,
	requiredValidator,
} from "solform";
import { Accessor, Component, Show, createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ErrorMessage, VisibleIcon } from "../utils";
import { AiOutlineEye, AiOutlineEyeInvisible } from "solid-icons/ai";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "~/components/ui/toast";

interface RegisterFormSchema {
	username: string;
	email: string;
	password: string;
}

export default function RegisterForm() {
	const [showPassword, setShowPassword] = createSignal(false);
	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const { register, submit, errors } = createForm<RegisterFormSchema>({
		validators: {
			username: [
				requiredValidator("The username is required"),
				minLengthValidator(
					5,
					"The username must have at least 5 characters"
				),
				maxLengthValidator(
					20,
					"The username must NOT have more than 20 characters"
				),
			],
			email: [
				requiredValidator("The email is required"),
				emailValidator("Invalid Email"),
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
		onSubmit: async (values) => {
			const { error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						username: values.username,
						onboarded: false,
					},
				},
			});

			if (error) {
				showToast({
					title: "Error",
					description: error.message,
				});
			}
		},
	});
	return (
		<form class="space-y-4">
			<Flex flexDirection="col" justifyContent="start" class="space-y-2">
				<Label class="mr-auto">Username</Label>
				<Input {...register("username")} />
				<ErrorMessage error={errors.username} />
			</Flex>
			<Flex flexDirection="col" justifyContent="start" class="space-y-2">
				<Label class="mr-auto">Email</Label>
				<Input {...register("email")} type="email" />
				<ErrorMessage error={errors.email} />
			</Flex>
			<Flex flexDirection="col" justifyContent="start" class="space-y-2">
				<Label class="mr-auto">Password</Label>
				<div class="relative w-full">
					<Input
						{...register("password")}
						type={showPassword() ? "text" : "password"}
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
			<Button onClick={submit} size="sm" class="w-full">
				Register
			</Button>
		</form>
	);
}
