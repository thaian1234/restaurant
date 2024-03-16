import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DishFormSkeleton } from "./_components/dish-form";

export default function LoadingPage() {
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
