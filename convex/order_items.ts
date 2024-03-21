import { v } from "convex/values";
import { mutation, query } from "./functions";
import { OrderItemStatus } from "./schema";

export const getOrderItems = query({
	async handler(ctx) {
		try {
			const user = await ctx.auth.getUserIdentity();
			if (!user) throw new Error("Unauthorized");

			const orderItems = ctx
				.table("order_items")
				.order("asc")
				.map(async (item) => {
					return {
						...item,
						dishName: (await item.edgeX("dishe")).name,
						tableName: (
							await (await item.edgeX("order")).edgeX("table")
						).name,
					};
				});
			if (!orderItems) return null;

			return orderItems;
		} catch (error) {
			return null;
		}
	},
});

export const updateStatus = mutation({
	args: {
		id: v.id("order_items"),
		status: v.union(
			v.literal(OrderItemStatus.inProgress),
			v.literal(OrderItemStatus.complete),
			v.literal(OrderItemStatus.delivered)
		),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const orderItem = ctx
			.table("order_items")
			.getX(args.id)
			.patch({
				status: args.status,
			})
			.catch(() => {
				throw new Error("Cập nhật thất bại");
			});

		return orderItem;
	},
});
