"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

interface ConvexClientProviderProps {
	children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
	children,
}: ConvexClientProviderProps) => {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk useAuth={useAuth} client={convex}>
				<ClerkLoaded>{children}</ClerkLoaded>
				<ClerkLoading>
					<Loading />
				</ClerkLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
