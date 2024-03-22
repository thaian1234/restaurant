import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ClientSkeleton } from "./_components/client";

export default function WaitlistLoading() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="w-44 h-12" />
			</div>
			<Separator />
			<ClientSkeleton />
		</section>
	);
}
