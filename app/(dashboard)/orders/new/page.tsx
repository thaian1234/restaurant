import { Separator } from "@/components/ui/separator";
import { OrderForm } from "./_components/order-form";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";

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
			</div>
			<Separator />
			<OrderForm
				preloadTables={preloadTables}
				preloadedDishes={preloadedDishes}
			/>
		</section>
	);
}
