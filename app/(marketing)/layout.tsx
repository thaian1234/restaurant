import { Header } from "./_components/header";

export default function MarketingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col h-full">
			<Header />
			<main className="flex-1">{children}</main>
		</div>
	);
}
