import { Id } from "@/convex/_generated/dataModel";

import { CtxType } from "@/convex/types";
import { UserService } from "./user-service";
import { OrderItemService } from "./order-item-service";

export class OrderService {
	ctx: CtxType;
	userService: UserService;
	orderItemService: OrderItemService;

	constructor(ctx: CtxType) {
		this.ctx = ctx;
		this.userService = new UserService(ctx);
		this.orderItemService = new OrderItemService(ctx);
	}

	async getOrders() {
		try {
			const user = await this.userService.getCurrentUser();
			if (!user) throw new Error("Unauthorized");

			const orders = await this.ctx
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
	}

	async createOrder(tableId: Id<"tables">, dishIds: Id<"dishes">[]) {
		//Lấy thông tin user tạo order
		const currentUser = await this.userService.getCurrentUser();

		if (currentUser) {
			// Tạo order rỗng
			const orderId = await this.createEmptyOrder(
				tableId,
				currentUser._id
			);

			if (orderId) {
				// Tạo ra các orderItems dựa vào orderId vừa tạo và các giá trị từ dishIds
				await this.orderItemService.createOrderItems(orderId, dishIds);
			} else {
				throw new Error("Tạo order thất bại");
			}
		} else {
			throw new Error("Unauthorized");
		}
	}

	async createEmptyOrder(tableId: string, userId: Id<"users">) {
		const orderId = await this.ctx.table("orders").insert({
			isPaid: false,
			tableId: tableId as Id<"tables">,
			userId: userId,
		});

		return orderId;
	}
}
