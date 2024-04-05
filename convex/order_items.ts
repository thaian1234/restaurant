import { v } from "convex/values";
import { mutation, query } from "./functions";
import { OrderItemStatus, statusType } from "./schema";
import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx } from "./types";

export type orderItemField = Omit<Doc<"order_items">, "_id" | "_creationTime">;

function formattedOrderItems(
	orderId: Id<"orders">,
	dishIds: string[]
): orderItemField[] {
	const formattedValues = dishIds.reduce((acc, dishId) => {
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
	}, [] as orderItemField[]);

	return formattedValues;
}

export const getOrderItems = query({
	async handler(ctx) {
		try {
			const user = await ctx.auth.getUserIdentity();
			if (!user) throw new Error("Unauthorized");

			const orderItems = ctx
				.table("order_items")
				.order("desc")
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
		status: statusType,
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

export async function createOrderItems(
	ctx: MutationCtx,
	orderId: Id<"orders">,
	dishIds: string[]
) {
	// Format lại các giá trị
	const formattedValues = formattedOrderItems(orderId, dishIds);

	// Tạo các orderItems từ giá trị đã format
	const orderItems = await ctx
		.table("order_items")
		.insertMany(formattedValues);

	if (!orderItems) throw new Error("Thêm món ăn thất bại");

}
