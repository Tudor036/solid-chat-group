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
