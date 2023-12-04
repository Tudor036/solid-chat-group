import { useContext } from "solid-js";
import { SessionContext } from "~/components/sessionProvider";

const useSession = () => {
	const context = useContext(SessionContext);
	return [
		{
			session: () => context.session,
			loading: () => context.loading,
			error: () => context.error,
		},
	];
};

export default useSession;
