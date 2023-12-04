import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import RegisterForm from "./components/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import LoginForm from "./components/login";

export default function Auth() {
	return (
		<Tabs defaultValue="login" class="space-y-2">
			<TabsList class="grid grid-cols-2 w-full">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>
			<Card class="max-w-sm w-full">
				<CardHeader>
					<CardTitle>Chat Group App</CardTitle>
					<CardDescription>
						You'll need to sign in before using the chat
					</CardDescription>
				</CardHeader>
				<CardContent class="w-full space-y-4">
					<TabsContent value="login">
						<LoginForm />
					</TabsContent>
					<TabsContent value="register">
						<RegisterForm />
					</TabsContent>
				</CardContent>
			</Card>
		</Tabs>
	);
}
