import { v } from "convex/values";
import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";

const schema = defineEntSchema({
	dishes: defineEnt({
		name: v.string(),
		price: v.number(),
		imageUrl: v.string(),
	})
		.edge("menu")
		.edges("order_items", { ref: "dishId" }),

	menus: defineEnt({
		name: v.string(),
	}).edges("dishes", { ref: true }),

	orders: defineEnt({
		isPaid: v.boolean(),
		userId: v.string(),
	}).edges("order_items", { ref: true }),

	order_items: defineEnt({}).edge("order").edge("dishe", { field: "dishId" }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
