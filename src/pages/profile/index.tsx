import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase/client";

export default function Profile() {
	const handleLogOut = async () => await supabase.auth.signOut();

	return (
		<section>
			<h1>Profile</h1>
			<Button onClick={handleLogOut}>Log Out</Button>
		</section>
	);
}
