import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { OrderItemStatus } from "@/convex/schema";
import { getAuthToken } from "@/lib/auth";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table";
import { number } from "zod";

export default async function WaitListPage() {
	const token = await getAuthToken();
	const preloadedOrderItem = await preloadQuery(
		api.order_items.getOrderItems,
		{},
		{ token }
	);
	const orderItems = preloadedQueryResult(preloadedOrderItem);

	if (!orderItems) redirect("/");

	const orderItemsInProgress = orderItems.filter(
		(item) => item.status === OrderItemStatus.inProgress
	);

	const orderItemsCompleted = orderItems.filter(
		(item) => item.status === OrderItemStatus.complete
	);

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Danh sách Waitlist
				</h2>
			</div>
			<Separator />

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
		</section>
	);
}
