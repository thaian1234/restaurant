import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Preloaded } from "convex/react";
import { MenuItem } from "./menu-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuListProps {
	dishes: Doc<"dishes">[];
	value: string[];
	onChange: (...value: any[]) => void;
}

export function MenuList({ dishes, value, onChange }: MenuListProps) {
	return (
		<ScrollArea className="w-full h-[600px]">
			<div className="divide-y divide-primary/40 p-2">
				{dishes.map((dish) => (
					<MenuItem
						key={dish._id}
						dish={dish}
						value={value}
						onChange={onChange}
					/>
				))}
			</div>
		</ScrollArea>
	);
}

export function MenuListSkeleton() {
	return (
		<div className="w-full h-[600px]">
			<Skeleton className="size-full" />
		</div>
	);
}
