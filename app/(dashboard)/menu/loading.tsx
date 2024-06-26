import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ListMenuSkeleton } from "./_components/menu-list";

export default function LoadingMenu() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="w-[240px] h-14" />
				<Skeleton className="w-[260px] h-14" />
			</div>
			<Separator />
			<ListMenuSkeleton />
		</section>
	);
}
