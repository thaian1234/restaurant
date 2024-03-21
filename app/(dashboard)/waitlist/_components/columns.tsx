"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { ArrowUpDown, CheckCircle2Icon } from "lucide-react";
import { CellActions } from "./cell-actions";
import { OrderItemStatus } from "@/convex/schema";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export interface OrderItemColumn extends Doc<"order_items"> {
// 	dishName: string;
// 	tableName: string;
// }

export type OrderItemColumn = Doc<"order_items"> & {
	dishName: string;
	tableName: string;
};

export const columns: ColumnDef<OrderItemColumn>[] = [
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
					<ArrowUpDown className="ml-2 size-4" />
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
		accessorKey: "dishName",
		header: () => {
			return <h3 className="font-bold text-base">Tên món ăn</h3>;
		},
		cell({ row }) {
			return <p>{row.original.dishName}</p>;
		},
		filterFn: "includesString",
	},

	{
		accessorKey: "tableName",
		header: () => {
			return <h3 className="font-bold text-base">Bàn</h3>;
		},
		cell({ row }) {
			return <p>{row.original.tableName}</p>;
		},
	},

	{
		accessorKey: "quantity",
		header: () => {
			return <h3 className="font-bold text-base">Số lượng</h3>;
		},
		cell({ row }) {
			return <p>{row.original.quantity}</p>;
		},
	},
	{
		accessorKey: "status",
		header: () => {
			return <h3 className="font-bold text-base">Trạng thái</h3>;
		},
		cell({ row }) {
			return (
				<Badge
					variant={
						row.original.status === OrderItemStatus.complete
							? "completed"
							: "inProgress"
					}
				>
					{row.original.status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "_id",
		header: () => {
			return "";
		},
		cell({ row }) {
			return (
				<CellActions
					id={row.original._id}
					currentStatus={row.original.status}
				/>
			);
		},
	},
];
