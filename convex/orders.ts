import { v } from "convex/values";
import { mutation, query } from "./functions";
import { Id } from "./_generated/dataModel";
import { CtxType } from "./types";
import { OrderService } from "@/hooks/order-service";

export const createOrder = mutation({
	args: {
		tableId: v.string(),
		dishIds: v.array(v.string()),
	},
	async handler(ctx, args) {
		// Tạo ra đối tượng orderService
		const orderService = new OrderService(ctx);

		// Sử dụng hàm createOrder từ orderService
		await orderService.createOrder(
			args.tableId as Id<"tables">,
			args.dishIds as Id<"dishes">[]
		);
	},
});

export const getOrders = query({
	async handler(ctx) {
		const orderService = new OrderService(ctx as CtxType);

		return await orderService.getOrders();
	},
});
