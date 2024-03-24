import { v } from "convex/values";
import { query } from "./functions";

export const getTables = query({
	async handler(ctx) {
		try {
			const user = await ctx.auth.getUserIdentity();
			if (!user) throw new Error("Unauthorized");

			const tables = await ctx.table("tables");

			return tables;
		} catch (error) {
			return null;
		}
	},
});

export const getTableById = query({
	args: {
		id: v.id("tables"),
	},
	async handler(ctx, args) {
		try {
			const user = await ctx.auth.getUserIdentity();

			if (!user) throw new Error("Unauthorized");

			const table = await ctx.table("tables").getX(args.id);

			return table;
		} catch (error) {
			return null;
		}
	},
});
