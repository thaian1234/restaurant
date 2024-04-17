import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { fontPoppins } from "@/fonts";
import NextTopLoader from "nextjs-toploader";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
	title: "Restaurant",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ViewTransitions>
				<body
					className={cn(
						"bg-background font-sans antialiased",
						fontPoppins.variable
					)}
				>
					<ConvexClientProvider>
						{/* <NextTopLoader
							height={6}
							showSpinner={false}
							color="#F66B15CC"
						/> */}
						<Toaster />
						<NextSSRPlugin
							routerConfig={extractRouterConfig(ourFileRouter)}
						/>
						{children}
					</ConvexClientProvider>
				</body>
			</ViewTransitions>
		</html>
	);
}
