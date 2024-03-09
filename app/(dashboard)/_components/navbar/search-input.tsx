import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchInput() {
	return (
		<div className="w-full">
			<div className="relative max-w-sm lg:max-w-lg flex items-center">
				<SearchIcon className="absolute right-2 text-muted-foreground/60" />
				<Input className="max-w-lg border-2" placeholder="Tìm món ăn" />
			</div>
		</div>
	);
}
