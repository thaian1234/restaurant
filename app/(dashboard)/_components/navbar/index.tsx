"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";

import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { cn } from "@/lib/utils";

export function Navbar() {
	const { scrolled } = useScrollTop();

	return (
		<nav
			className={cn(
				"flex justify-between items-center w-full py-4 px-10",
				scrolled && "border-b shadow-md transition-colors bg-white/30"
			)}
		>
			<SearchInput />
			<UserButton afterSignOutUrl="/" />
		</nav>
	);
}
