import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";

export function Navbar() {
	return (
		<nav className="flex justify-between items-center">
			<SearchInput />
			<UserButton />
		</nav>
	);
}
