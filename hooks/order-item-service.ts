import { Doc, Id } from "@/convex/_generated/dataModel";
import { OrderItemStatus } from "@/convex/schema";
import { UserService } from "./user-service";
import { CtxType, MutationCtx } from "@/convex/types";

export type orderItemField = Omit<Doc<"order_items">, "_id" | "_creationTime">;

export class OrderItemService {
	ctx: CtxType;
	userService: UserService;

	constructor(ctx: CtxType) {
		this.ctx = ctx;
		this.userService = new UserService(ctx);
	}

	formattedOrderItems(
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

	async createOrderItems(orderId: Id<"orders">, dishIds: Id<"dishes">[]) {
		// Format lại các giá trị
		const formattedValues = this.formattedOrderItems(orderId, dishIds);

		// Tạo các orderItems từ giá trị đã format
		await this.ctx.table("order_items").insertMany(formattedValues);
	}

	async findOrderItemById(id: Id<"order_items">) {
		const orderItem = await this.ctx.table("order_items").get(id);

		return orderItem;
	}

	async updateStatus(
		orderItemId: Id<"order_items">,
		status: OrderItemStatus
	) {
		const user = await this.userService.getCurrentUser();
		if (!user) throw new Error("Unauthorized");

		const existingItem = await this.findOrderItemById(orderItemId);
		if (!existingItem) throw new Error("Không tìm thấy Order item");

		await existingItem.patch({
			status: status,
		});
	}

	async getOrderItems() {
		try {
			const user = await this.userService.getCurrentUser();
			if (!user) throw new Error("Unauthorized");

			const orderItems = this.ctx
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
	}
}
