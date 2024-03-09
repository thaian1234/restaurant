"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

export function Header() {
	const { scrolled } = useScrollTop();

	return (
		<header
			className={cn(
				"py-4 w-full sticky z-50 backdrop-blur-sm h-20 inset-0",
				scrolled && "border-b shadow-md transition-colors bg-white/30"
			)}
		>
			<Navbar />
		</header>
	);
}
