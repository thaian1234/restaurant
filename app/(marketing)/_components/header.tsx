import { Logo } from "@/components/logo";
import { Navbar } from "./navbar";

export function Header() {
	return (
		<header className="flex items-center justify-between py-4 px-6 border-b">
			<Logo href="/" size={100} />
			<Navbar />
		</header>
	);
}
