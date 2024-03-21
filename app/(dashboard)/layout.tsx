import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Toolbox } from "./_components/toolbox";
import { Wrapper } from "./_components/wrapper";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Sidebar />
			<section className="flex-1 flex-col pl-[250px] relative">
				<Header />
				<Toolbox />
				<Wrapper>{children}</Wrapper>
			</section>
		</>
	);
}
