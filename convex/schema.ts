import { Infer, v } from "convex/values";
import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";

export enum OrderItemStatus {
	inProgress = "Đang làm",
	complete = "Hoàn thành",
	delivered = "Đã giao",
}

export const statusType = v.union(
	v.literal(OrderItemStatus.inProgress),
	v.literal(OrderItemStatus.complete),
	v.literal(OrderItemStatus.delivered)
);

const schema = defineEntSchema({
	dishes: defineEnt({
		name: v.string(),
		price: v.number(),
		imageUrl: v.string(),
	}).edges("order_items", { ref: "dishId" }),

	orders: defineEnt({
		isPaid: v.boolean(),
		userId: v.string(),
		username: v.string(),
	})
		.edges("order_items", { ref: true })
		.edge("table"),

	order_items: defineEnt({
		quantity: v.number(),
		status: statusType,
	})
		.edge("order")
		.edge("dishe", { field: "dishId" }),

	tables: defineEnt({
		name: v.string(),
	}).edges("orders", { ref: true }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
