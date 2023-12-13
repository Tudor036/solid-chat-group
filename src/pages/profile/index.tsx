import { useNavigate } from "@solidjs/router";
import Protected from "~/components/protected";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";
import { supabase } from "~/lib/supabase/client";

export default function Profile() {
	const navigate = useNavigate();
	const handleLogOut = async () => {
		try {
			await supabase.auth.signOut();
			navigate("/auth");
		} catch (err: any) {
			showToast({
				title: "Error",
				description: err.message,
			});
		}
	};

	return (
		<Protected>
			<section>
				<h1>Profile</h1>
				<Button onClick={handleLogOut}>Log Out</Button>
			</section>
		</Protected>
	);
}
