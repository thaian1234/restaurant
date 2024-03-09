import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
	dish: Doc<"dishes">;
}

export function MenuItem({ dish }: MenuItemProps) {
	return (
		<Link href="">
			<div className="rounded-3xl border-2 flex flex-col shadow-md hover:shadow-lg hover:shadow-primary/20 overflow-hidden bg-white group">
				<div className="relative aspect-square border group-hover:shadow-lg group-hover:translate-x-0 rotate-6 -translate-x-1 -translate-y-1/4 group-hover:rotate-0 rounded-3xl overflow-hidden transition">
					<Image
						src={dish.imageUrl}
						alt="Dish image"
						fill
						sizes="50vw"
						className="object-cover"
						priority
					/>
				</div>
				<div className="px-8 flex items-center justify-between gap-y-3 -translate-y-10 group-hover:text-primary/45 transition">
					<h3 className="font-semibold">{dish.name}</h3>
					<p className="text-muted-foreground">${dish.price}</p>
				</div>
			</div>
		</Link>
	);
}
