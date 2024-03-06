import { ClerkLoaded } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Wrapper } from "./_components/wrapper";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkLoaded>
			<section className="flex">
				<Sidebar />
				<div className="flex-1 flex-col">
					<Header />
					<Wrapper>{children}</Wrapper>
				</div>
			</section>
		</ClerkLoaded>
	);
}
