"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, subDays } from "date-fns";
import { vi } from "date-fns/locale/vi";

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
		header: () => {
			return <h3 className="font-bold text-base">Tạo lúc</h3>;
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
		header: () => {
			return <h3 className="font-bold text-base">Trạng thái</h3>;
		},
		cell({ row }) {
			const status = row.original.isPaid
				? "Đã thanh toán"
				: "Chưa thanh toán";

			return <p>{status}</p>;
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
	},
];
