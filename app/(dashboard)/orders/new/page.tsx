import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Separator } from "@/components/ui/separator";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { OrderForm, OrderFormSkeleton } from "./_components/order-form";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";
import { Suspense } from "react";

export default async function CreateOrderPage() {
	const token = await getAuthToken();
	const preloadTablesData = preloadQuery(api.tables.getTables, {}, { token });

	const preloadedDishesData = preloadQuery(
		api.dishes.getDishes,
		{},
		{ token }
	);

	const [preloadTables, preloadedDishes] = await Promise.all([
		preloadTablesData,
		preloadedDishesData,
	]);

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Tạo Order
				</h2>
				<Link href={"/orders"} aria-label="Go to order">
					<Hint label="Về order" side="top" align="center" asChild>
						<Button variant={"ghost"} size={"icon"}>
							<CornerDownLeft
								className="size-8 p-2"
								aria-label="Go to menu"
							/>
						</Button>
					</Hint>
				</Link>
			</div>
			<Separator />
			<Suspense fallback={<OrderFormSkeleton />}>
				<OrderForm
					preloadTables={preloadTables}
					preloadedDishes={preloadedDishes}
				/>
			</Suspense>
		</section>
	);
}
