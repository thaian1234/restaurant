import { v } from "convex/values";
import { mutation, query } from "./functions";
import { Id } from "./_generated/dataModel";
import { createOrderItems } from "./order_items";
import { MutationCtx } from "./types";
import { getCurrentUser } from "./users";

async function createEmptyOrder(ctx: MutationCtx, tableId: string) {
	const user = await getCurrentUser(ctx);
	if (!user) return null;

	const orderId = await ctx.table("orders").insert({
		isPaid: false,
		tableId: tableId as Id<"tables">,
		userId: user._id,
	});

	if (!orderId) return null;

	return orderId;
}

export const create = mutation({
	args: {
		tableId: v.string(),
		dishIds: v.array(v.string()),
	},
	async handler(ctx, args) {
		const user = await getCurrentUser(ctx);
		if (!user) throw new Error("Unauthorized");

		// Tạo order rỗng
		const orderId = await createEmptyOrder(ctx, args.tableId);
		if (!orderId) throw new Error("Tạo order thất bại");

		// Tạo ra các orderItems dựa vào orderId vừa tạo và các giá trị từ dishIds
		await createOrderItems(ctx, orderId, args.dishIds);

		return orderId;
	},
});

export const getOrders = query({
	async handler(ctx) {
		try {
			const user = await ctx.auth.getUserIdentity();
			if (!user) throw new Error("Unauthorized");

			const orders = await ctx
				.table("orders")
				.order("desc")
				.map(async (order) => ({
					...order,
					tableName: (await order.edgeX("table")).name,
					createdBy: (await order.edgeX("user")).username,
				}));

			return orders;
		} catch (error) {
			return null;
		}
	},
});
