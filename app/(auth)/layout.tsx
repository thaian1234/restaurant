export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex bg-gradient-to-tr from-sky-700 to-sky-400 h-screen items-center justify-center">
			{children}
		</div>
	);
}
