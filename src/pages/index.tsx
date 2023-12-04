import Protected from "~/components/protected";

export default function Home() {
	return (
		<Protected>
			<section>
				<h1>Hello World!</h1>
			</section>
		</Protected>
	);
}
