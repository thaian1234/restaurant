import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Separator } from "@/components/ui/separator";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { DishForm, DishFormSkeleton } from "./_components/dish-form";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuIdPageProps {
	params: {
		dishId: string;
	};
}

export default async function MenuIdPage({ params }: MenuIdPageProps) {
	const token = await getAuthToken();
	const preloadDish = await preloadQuery(
		api.dishes.getDishById,
		{
			id: params.dishId,
		},
		{ token }
	);
	const title = preloadDish._valueJSON ? "Cập nhật món ăn" : "Tạo món ăn";

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					{title}
				</h2>
				<Link href={"/menu"} aria-label="Go to menu">
					<Hint label="Về menu" side="top" align="center" asChild>
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
			<DishForm initialData={preloadDish} />
		</section>
	);
}

export function DishIdPageLoading() {
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="w-48 h-12" />
				<Skeleton className="size-10" />
			</div>
			<Separator />
			<DishFormSkeleton />
		</div>
	);
}
