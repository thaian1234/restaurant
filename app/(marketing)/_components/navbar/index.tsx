"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export function Navbar() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<nav>
			{!isAuthenticated && (
				<SignInButton mode="modal">
					<Button isLoading={isLoading}>Sign in</Button>
				</SignInButton>
			)}
			{isAuthenticated && <UserButton afterSignOutUrl="/" />}
		</nav>
	);
}
