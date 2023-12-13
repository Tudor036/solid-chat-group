import {
	createForm,
	maxLengthValidator,
	minLengthValidator,
	requiredValidator,
} from "solform";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import Protected from "~/components/protected";
import DefaultAvatar from "~/assets/images/default-avatar.webp";
import useAuth from "~/store/useAuth";
import { supabase } from "~/lib/supabase/client";
import { showToast } from "~/components/ui/toast";
import { useNavigate } from "@solidjs/router";

interface OnboardingFormType {
	username: string;
}

export default function Onboarding() {
	const navigate = useNavigate();
	const [ctx] = useAuth();
	const { register, submit } = createForm<OnboardingFormType>({
		validators: {
			username: [
				requiredValidator("The username is required"),
				minLengthValidator(
					6,
					"The username must have at least 6 characters"
				),
				maxLengthValidator(
					20,
					"The username must not have more than 20 characters"
				),
			],
		},
		async onSubmit(values) {
			const { error } = await supabase.auth.updateUser({
				data: {
					onboarded: true,
					username: values.username,
				},
			});

			console.log(values);

			if (!error) return navigate("/profile");

			showToast({
				title: "Error",
				description: error.message,
			});
		},
	});

	const handleAvatarInput = (e: Event & {}) => {};

	return (
		<Protected>
			<form
				class="flex flex-col space-y-4"
				onSubmit={async (e) => {
					e.preventDefault();
					await submit(e);
					navigate("/profile");
					console.log("submitted");
				}}
			>
				<Flex flexDirection="col" class="space-y-2">
					<Avatar class="w-28 h-28">
						<AvatarImage
							src={
								ctx.user()?.user_metadata?.photoUrl ??
								DefaultAvatar
							}
						/>
					</Avatar>
					<Label class="mr-auto">Avatar:</Label>
					<Input type="file" onInput={handleAvatarInput} />
				</Flex>
				<Flex flexDirection="col" class="space-y-2">
					<Label class="mr-auto">Username:</Label>
					<Input {...register("username")} type="text" />
				</Flex>
				<Button type="submit">Save</Button>
			</form>
		</Protected>
	);
}
