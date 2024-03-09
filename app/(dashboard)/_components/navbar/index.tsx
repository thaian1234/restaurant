import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";

export function Navbar() {
	return (
		<nav className="flex justify-between items-center w-[90%] mx-auto">
			<SearchInput />
			<UserButton />
		</nav>
	);
}
