// import { ClerkLoaded } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Wrapper } from "./_components/wrapper";
import { Authenticated } from "convex/react";
// import { Authenticated } from "convex/react";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="flex">
			<Sidebar />
			<div className="flex-1 flex-col pl-[250px]">
				<Header />
				<Wrapper>{children}</Wrapper>
			</div>
		</section>
	);
}
