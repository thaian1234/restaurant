import { v } from "convex/values";
import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";

const schema = defineEntSchema({
	dishes: defineEnt({
		name: v.string(),
		price: v.number(),
		imageUrl: v.optional(v.string()),
	}).edge("menu"),

	menus: defineEnt({
		name: v.string(),
	}).edges("dishes", { ref: true }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
