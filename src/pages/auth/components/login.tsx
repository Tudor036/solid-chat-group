import {
	createForm,
	emailValidator,
	maxLengthValidator,
	minLengthValidator,
	requiredValidator,
} from "solform";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ErrorMessage, VisibleIcon } from "../utils";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "~/components/ui/toast";

interface LoginFormSchema {
	email: string;
	password: string;
}

export default function LoginForm() {
	const [showPassword, setShowPassword] = createSignal(false);
	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const { register, submit, errors } = createForm<LoginFormSchema>({
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
		onSubmit: async (values) => {
			const { error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
				options: {},
			});

			if (error) {
				showToast({
					title: "Error",
					description: error.message,
					variant: "destructive",
				});
			}
		},
	});

	return (
		<form class="space-y-4">
			<Flex flexDirection="col" justifyContent="start" class="space-y-2">
				<Label class="mr-auto">Email</Label>
				<Input {...register("email")} />
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
			<Button type="submit" size="sm" class="w-full" onClick={submit}>
				Login
			</Button>
		</form>
	);
}
