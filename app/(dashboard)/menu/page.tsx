import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Danh sách món ăn
				</h2>
				<Link href={"/menu/create"}>
					<Button>
						<PlusCircleIcon className="size-4 mr-2" />
						Thêm món ăn
					</Button>
				</Link>
			</div>
			<Separator />
			{/* TODO: Danh sách món ăn */}
		</section>
	);
}
