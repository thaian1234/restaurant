import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ItemProps {
	label: string;
	icon: LucideIcon;
	href: string;
	isActive?: boolean;
}

export function Item({ href, icon: Icon, label, isActive }: ItemProps) {
	return (
		<Link href={href}>
			<Button
				className={cn(
					"size-full py-3 ",
					isActive &&
						"bg-gradient-to-r from-orange-500/40 to-orange-400/80 text-foreground"
				)}
				variant={"sidebar"}
			>
				<Icon className="mr-4 size-7" />
				{label}
			</Button>
		</Link>
	);
}
