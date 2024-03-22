import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { Client } from "./_components/client";

export default async function WaitListPage() {
	const token = await getAuthToken();
	const preloadedOrderItems = await preloadQuery(
		api.order_items.getOrderItems,
		{},
		{ token }
	);
	const orderItems = preloadedQueryResult(preloadedOrderItems);

	if (!orderItems) redirect("/");

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Danh sách Waitlist
				</h2>
			</div>
			<Separator />

			<Client preloadedOrderItems={preloadedOrderItems} />
		</section>
	);
}
