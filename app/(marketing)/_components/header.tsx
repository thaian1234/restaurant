import { Logo } from "@/components/logo";
import { Navbar } from "./navbar";

export function Header() {
	return (
		<header className="flex items-center justify-between p-4 border-b">
			<Logo href="/" size={80} />
			<Navbar />
		</header>
	);
}
