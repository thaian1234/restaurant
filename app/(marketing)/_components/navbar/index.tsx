import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export function Navbar() {
	const { userId } = auth();

	return (
		<nav className="px-4">
			{!userId && (
				<SignInButton mode="modal">
					<Button>Sign in</Button>
				</SignInButton>
			)}
			{userId && <UserButton afterSignOutUrl="/" />}
		</nav>
	);
}
