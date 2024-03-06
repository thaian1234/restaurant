import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchInput() {
	return (
		<div className="w-full ml-12">
			<div className="relative max-w-lg flex items-center">
				<SearchIcon className="absolute right-2" />
				<Input
					className="max-w-lg border-2"
					placeholder="Search for dishes"
				/>
			</div>
		</div>
	);
}
