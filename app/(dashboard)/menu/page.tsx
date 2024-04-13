import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { preloadQuery } from "convex/nextjs";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";
import { ListMenu } from "./_components/menu-list";

export default async function MenuPage() {
	const token = await getAuthToken();
	const preloadDishes = await preloadQuery(
		api.dishes.getDishes,
		{},
		{ token }
	);

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Danh sách món ăn
				</h2>
				<Link href={"/menu/dish/new"}>
					<Button>
						<PlusCircleIcon className="size-4 mr-2" />
						Thêm món ăn
					</Button>
				</Link>
			</div>
			<Separator />
			<ListMenu preloadDishes={preloadDishes} />
		</section>
	);
}
