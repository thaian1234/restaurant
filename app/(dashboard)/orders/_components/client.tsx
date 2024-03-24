"use client";

import { DataTable } from "@/components/data-table";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { columns } from "./columns";
import { redirectToSignIn } from "@clerk/nextjs";

interface ClientProps {
	preloadedOrders: Preloaded<typeof api.orders.getOrders>;
}

export function Client({ preloadedOrders }: ClientProps) {
	const orders = usePreloadedQuery(preloadedOrders);

	if (!orders) return null;

	return <DataTable data={orders} columns={columns} searchKey="createdBy" />;
}
