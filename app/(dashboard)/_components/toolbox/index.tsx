"use client";

import { ArrowUpCircle, CheckCircle2Icon, Loader2 } from "lucide-react";
import { Item } from "./item";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { OrderItemStatus } from "@/convex/schema";
import { redirect } from "next/navigation";

export function Toolbox() {
	const orderItems = useQuery(api.order_items.getOrderItems, {});
	if (orderItems === undefined) return <ToolboxSkeleton />;
	if (orderItems === null) redirect("/");

	const isCompletedQuantity = orderItems.filter(
		(item) => item.status === OrderItemStatus.complete
	).length;
	const inProgressQuantity = orderItems.filter(
		(item) => item.status === OrderItemStatus.inProgress
	).length;

	const items = [
		{
			label: "Đang làm",
			icon: ArrowUpCircle,
			quantity: inProgressQuantity,
		},
		{
			label: "Hoàn thành",
			icon: CheckCircle2Icon,
			quantity: isCompletedQuantity,
		},
	];

	return (
		<aside className="hidden fixed border border-primary/60 right-4 px-3 py-4 top-1/3 xl:flex flex-col space-y-3 rounded-lg">
			{items.map((item, i) => (
				<Item
					key={i}
					label={item.label}
					icon={item.icon}
					quantity={item.quantity}
				/>
			))}
		</aside>
	);
}

export function ToolboxSkeleton() {
	return (
		<aside className="fixed border border-primary/60 right-4 px-3 py-4 top-1/3 flex flex-col space-y-3 rounded-lg">
			<Loader2 className="animate-spin size-5" />
		</aside>
	);
}
