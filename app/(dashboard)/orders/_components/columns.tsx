"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, subDays } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
	_id: Id<"orders">;
	_creationTime: number;
	isPaid: boolean;
	userId: string;
	tableId: Id<"tables">;
	createdBy: string;
	tableName: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: "_creationTime",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="font-bold text-base"
				>
					Tạo lúc
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell({ row }) {
			return (
				<p>
					{formatDistance(row.original._creationTime, new Date(), {
						addSuffix: true,
						locale: vi,
					})}
				</p>
			);
		},
	},
	{
		accessorKey: "tableId",
		header: () => {
			return <h3 className="font-bold text-base">Bàn ăn</h3>;
		},
		cell({ row }) {
			return <p>{row.original.tableName}</p>;
		},
	},
	{
		accessorKey: "isPaid",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="font-bold text-base"
				>
					Trạng thái
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell({ row }) {
			const status = row.original.isPaid
				? "Đã thanh toán"
				: "Chưa thanh toán";

			return (
				<Badge
					variant={row.original.isPaid ? "completed" : "inProgress"}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "createdBy",
		header: () => {
			return <h3 className="font-bold text-base">Tạo bởi</h3>;
		},
		cell({ row }) {
			return <p>{row.original.createdBy}</p>;
		},
		filterFn: "includesString",
	},
];
