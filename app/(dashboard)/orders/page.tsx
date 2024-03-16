import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
	const token = await getAuthToken();
	const preloadedOrders = await preloadQuery(
		api.orders.getOrders,
		{},
		{ token }
	);
	const orders = preloadedQueryResult(preloadedOrders);

	if (!orders) return redirect("/");

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Danh sách order
				</h2>
				<Link href={"/orders/new"}>
					<Button>
						<PlusCircleIcon className="size-4 mr-2" />
						Tạo order
					</Button>
				</Link>
			</div>
			<Separator />
			{orders && <DataTable data={orders} columns={columns} />}
		</section>
	);
}
