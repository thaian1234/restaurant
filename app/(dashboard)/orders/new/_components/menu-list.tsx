import { Doc } from "@/convex/_generated/dataModel";
import { MenuItem } from "./menu-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuListProps {
	dishes: Doc<"dishes">[];
	value: string[];
	onChange: (...value: any[]) => void;
}

export function MenuList({ dishes, value, onChange }: MenuListProps) {
	return (
		<ScrollArea className="w-full h-[600px]">
			<ul className="divide-y divide-primary/40 p-2">
				{dishes.map((dish) => (
					<li key={dish._id}>
						<MenuItem
							key={dish._id}
							dish={dish}
							value={value}
							onChange={onChange}
						/>
					</li>
				))}
			</ul>
		</ScrollArea>
	);
}

export function MenuListSkeleton() {
	return (
		<div className="w-full h-[650px]">
			<Skeleton className="size-full" />
		</div>
	);
}
