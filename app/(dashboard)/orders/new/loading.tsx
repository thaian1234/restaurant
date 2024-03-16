import { Skeleton } from "@/components/ui/skeleton";
import { OrderFormSkeleton } from "./_components/order-form";
import { Separator } from "@/components/ui/separator";

export default function LoadingOrderNewPage() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="w-48 h-12" />
				<Skeleton className="size-10" />
			</div>
			<Separator />
			<OrderFormSkeleton />
		</section>
	);
}
