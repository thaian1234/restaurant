import { v } from "convex/values";
import { mutation, query } from "./functions";
import { Doc, Id } from "./_generated/dataModel";
import { OrderItemStatus } from "./schema";
import { internal } from "./_generated/api";

type orderField = Omit<Doc<"order_items">, "_id" | "_creationTime">;

export const create = mutation({
	args: {
		tableId: v.string(),
		dishIds: v.array(v.string()),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const orderId = await ctx.table("orders").insert({
			isPaid: false,
			tableId: args.tableId as Id<"tables">,
			userId: user.subject,
			username: user.name || "",
		});

		if (!orderId) throw new Error("Tạo order thất bại");

		const validatedOrderFields = args.dishIds.reduce((acc, dishId) => {
			const existingItem = acc.find((item) => item.dishId === dishId);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				acc.push({
					orderId,
					status: OrderItemStatus.inProgress,
					dishId: dishId as Id<"dishes">,
					quantity: 1,
				});
			}
			return acc;
		}, [] as orderField[]);

		await ctx
			.table("order_items")
			.insertMany(validatedOrderFields)
			.catch(() => {
				throw new Error("Thêm món ăn thất bại");
			});

		return orderId;
	},
});

export const getOrders = query({
	async handler(ctx) {
		try {
			const user = await ctx.auth.getUserIdentity();
			if (!user) throw new Error("Unauthorized");

			const orders = await ctx.table("orders").map(async (order) => ({
				...order,
				tableName: (await order.edgeX("table")).name,
				createdBy: order.username,
			}));

			return orders;
		} catch (error) {
			return null;
		}
	},
});
