import Link from "next/link";
import { CreateForm } from "./_components/create-form";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Tạo món ăn
				</h2>
				<Link href={"/menu"}>
					<Button variant={"ghost"} size={"icon"}>
						<CornerDownLeft className="size-8 p-2" />
					</Button>
				</Link>
			</div>
			<Separator />
			<CreateForm />
		</section>
	);
}
