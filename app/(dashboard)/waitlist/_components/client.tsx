"use client";

import { DataTable } from "@/components/data-table";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { columns } from "./columns";
import { redirectToSignIn } from "@clerk/nextjs";
import { OrderItemStatus } from "@/convex/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientProps {
	preloadedOrderItems: Preloaded<typeof api.order_items.getOrderItems>;
}

export function Client({ preloadedOrderItems }: ClientProps) {
	const orderItems = usePreloadedQuery(preloadedOrderItems);

	if (!orderItems) return redirectToSignIn();

	const orderItemsInProgress = orderItems.filter(
		(item) => item.status === OrderItemStatus.inProgress
	);

	const orderItemsCompleted = orderItems.filter(
		(item) => item.status === OrderItemStatus.complete
	);

	return (
		<>
			<DataTable
				data={orderItemsInProgress}
				columns={columns}
				title={"Đang làm"}
				searchKey="dishName"
			/>

			<DataTable
				data={orderItemsCompleted}
				columns={columns}
				title={"Nấu xong"}
				searchKey="dishName"
			/>
		</>
	);
}

export function ClientSkeleton() {
	return (
		<div className="flex flex-col space-y-8">
			<Skeleton className="w-full h-[350px]" />
			<Skeleton className="w-full h-[350px]" />
		</div>
	);
}
