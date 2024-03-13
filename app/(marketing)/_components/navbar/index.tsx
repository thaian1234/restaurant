import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

export function Navbar() {
	return (
		<nav className="px-4">
			<SignedIn>
				<UserButton afterSignOutUrl="/" />
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
		</nav>
	);
}
