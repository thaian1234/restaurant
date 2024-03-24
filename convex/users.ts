import { mutation } from "./functions";
import { QueryCtx } from "./types";

export const store = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Called storeUser without authentication present");
		}

		// Check if we've already stored this identity before.
		const user = await ctx
			.table("users")
			.get("tokenIdentifier", identity.tokenIdentifier);

		if (user !== null) {
			// If we've seen this identity before but the name has changed, patch the value.
			if (user.username !== identity.name) {
				await user.patch({
					username: identity.name,
				});
			}
			return user._id;
		}
		// If it's a new identity, create a new `User`.
		return await ctx.table("users").insert({
			username: identity.name ?? "",
			tokenIdentifier: identity.tokenIdentifier,
		});
	},
});

export async function getCurrentUser(ctx: QueryCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new Error("Unauthenticated call to mutation");
	}

	const user = await ctx
		.table("users")
		.get("tokenIdentifier", identity.tokenIdentifier);

	if (!user) return null;

	return user;
}
