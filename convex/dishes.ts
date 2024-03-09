import { v } from "convex/values";
import { mutation, query } from "./functions";

export const create = mutation({
	args: {
		price: v.number(),
		imageUrl: v.string(),
		name: v.string(),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const existingMenu = await ctx.table("menus").first();
		if (!existingMenu) throw new Error("Không tìm thấy menu");

		const dish = await ctx.table("dishes").insert({
			name: args.name,
			price: args.price,
			imageUrl: args.imageUrl,
			menuId: existingMenu._id,
		});

		if (!dish) throw new Error("Thêm món ăn thất bại");

		return dish;
	},
});

export const getDishes = query({
	async handler(ctx) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const dishes = await ctx.table("menus").firstX().edgeX("dishes");

		return dishes;
	},
});
