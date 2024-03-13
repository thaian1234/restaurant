"use client";

import { Logo } from "@/components/logo";
import { Home, ListOrdered, SoupIcon } from "lucide-react";
import { Item } from "./item";

export function Sidebar() {
	const routes = [
		{
			label: "Home",
			icon: Home,
			href: "/home",
		},
		{
			label: "Menu",
			icon: SoupIcon,
			href: "/menu",
		},
		{
			label: "Orders",
			icon: ListOrdered,
			href: "/orders",
		},
	];

	return (
		<aside className="w-[250px] min-h-screen fixed left-0 top-0 p-4 border-r flex flex-col z-[100]">
			<div className="flex items-center justify-center mb-8">
				<Logo size={120} href="/home" />
			</div>
			<ul className="space-y-3">
				{routes.map((item, i) => (
					<li key={i}>
						<Item
							label={item.label}
							href={item.href}
							icon={item.icon}
						/>
					</li>
				))}
			</ul>
		</aside>
	);
}
