"use client";

import { Logo } from "@/components/logo";
import { Home, Soup } from "lucide-react";
import { Item } from "./item";
import { usePathname } from "next/navigation";

export function Sidebar() {
	const pathname = usePathname();
	const routes = [
		{
			label: "Home",
			icon: Home,
			href: "/home",
		},
		{
			label: "Orders",
			icon: Soup,
			href: "/orders",
		},
	];
	return (
		<aside className="w-[250px] min-h-screen sticky p-4 space-y-2 border-r flex flex-col">
			<div className="flex items-center justify-center mb-8">
				<Logo size={120} href="/home" />
			</div>
			{routes.map((item, i) => (
				<Item
					key={i}
					label={item.label}
					href={item.href}
					icon={item.icon}
					isActive={pathname.includes(item.href)}
				/>
			))}
		</aside>
	);
}
