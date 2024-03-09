"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { MenuItem } from "./menu-item";
import { Skeleton } from "@/components/ui/skeleton";

interface ListMenuProps {
	preloadDishes: Preloaded<typeof api.dishes.getDishes>;
}

export function ListMenu({ preloadDishes }: ListMenuProps) {
	const dishes = usePreloadedQuery(preloadDishes);

	return (
		<ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
			<p className="hidden last:block">Không tìm thấy món ăn</p>
			{dishes.map((dish) => (
				<li key={dish._id}>
					<MenuItem dish={dish} />
				</li>
			))}
		</ul>
	);
}

export function ListMenuSkeleton() {
	return (
		<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
			{Array.from({ length: 4 }).map((_, i) => {
				return <Skeleton key={i} className="h-[260px] w-full" />;
			})}
		</div>
	);
}
