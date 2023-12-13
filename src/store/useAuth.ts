import { useContext } from "solid-js";
import { AuthContext } from "~/components/sessionProvider";

const useAuth = () => {
	const context = useContext(AuthContext);
	return [
		{
			session: () => context.session,
			user: () => context.user,
			loading: () => context.loading,
			error: () => context.error,
		},
	];
};

export default useAuth;
