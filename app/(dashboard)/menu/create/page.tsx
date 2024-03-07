import Link from "next/link";
import { CreateForm } from "./_components/create-form";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/ui/hint";

export default function CreatePage() {
	return (
		<section className="flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold tracking-tight first:mt-0">
					Tạo món ăn
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
			<CreateForm />
		</section>
	);
}
