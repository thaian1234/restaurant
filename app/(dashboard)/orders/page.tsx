import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
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
		</section>
	);
}
