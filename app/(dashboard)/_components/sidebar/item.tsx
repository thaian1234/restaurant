"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface ItemProps {
	label: string;
	icon: LucideIcon;
	href: string;
}

export function Item({ href, icon: Icon, label }: ItemProps) {
	const pathname = usePathname();
	const isActive = pathname.includes(href);

	return (
		<Link href={href}>
			<Button
				className={cn(
					"size-full py-3 text-muted-foreground",
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
