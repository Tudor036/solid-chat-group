import { useContext } from "solid-js";
import { SessionContext } from "~/components/sessionProvider";

const useSession = () => {
	const context = useContext(SessionContext);
	return [context];
};

export default useSession;
