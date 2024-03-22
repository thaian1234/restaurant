import { v } from "convex/values";
import { mutation, query } from "./functions";
import { Id } from "./_generated/dataModel";
import { cache } from "react";

export const create = mutation({
	args: {
		price: v.number(),
		imageUrl: v.string(),
		name: v.string(),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const dish = await ctx.table("dishes").insert({
			name: args.name,
			price: args.price,
			imageUrl: args.imageUrl,
		});

		if (!dish) throw new Error("Thêm món ăn thất bại");

		return dish;
	},
});

export const getDishes = cache(
	query({
		async handler(ctx) {
			try {
				const user = await ctx.auth.getUserIdentity();
				if (!user) throw new Error("Unauthorized");

				const dishes = await ctx.table("dishes");

				return dishes;
			} catch (error) {
				return null;
			}
		},
	})
);

export const getDishById = cache(
	query({
		args: { id: v.string() },
		async handler(ctx, args) {
			try {
				const user = await ctx.auth.getUserIdentity();
				if (!user) throw new Error("Unauthorized");

				const dish = await ctx
					.table("dishes")
					.get(args.id as Id<"dishes">);
				if (!dish) return null;

				return dish;
			} catch (error) {
				return null;
			}
		},
	})
);

export const update = mutation({
	args: {
		id: v.id("dishes"),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
		price: v.optional(v.number()),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const { id, ...fields } = { ...args };
		const dish = await ctx
			.table("dishes")
			.getX(id)
			.patch({
				...fields,
			});

		if (!dish) throw new Error("Cập nhật món ăn thất bại");

		return dish;
	},
});

export const deleteById = mutation({
	args: {
		id: v.id("dishes"),
	},
	async handler(ctx, args) {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error("Unauthorized");

		const dish = await ctx.table("dishes").getX(args.id).delete();
		if (!dish) throw new Error("Không thể xóa món ăn");

		return dish;
	},
});
