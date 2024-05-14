import { v } from "convex/values";
import { mutation, query } from "./functions";
import { statusType } from "./schema";
import { OrderItemService } from "@/hooks/order-item-service";
import { CtxType } from "./types";

export const getOrderItems = query({
	async handler(ctx) {
		const orderItemService = new OrderItemService(ctx as CtxType);
		return await orderItemService.getOrderItems();
	},
});

export const updateStatus = mutation({
	args: {
		orderItemId: v.id("order_items"),
		status: statusType,
	},
	async handler(ctx, args) {
		const orderItemService = new OrderItemService(ctx);
		await orderItemService.updateStatus(args.orderItemId, args.status);
	},
});
