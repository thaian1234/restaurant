// "use client";

import { Navbar } from "./navbar";

export function Header() {
	return (
		<header className="sticky z-50 backdrop-blur-sm inset-0">
			<Navbar />
		</header>
	);
}
