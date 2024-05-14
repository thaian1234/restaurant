import { CtxType, MutationCtx } from "@/convex/types";

export class UserService {
	ctx: CtxType;

	constructor(ctx: CtxType) {
		this.ctx = ctx;
	}

	async getCurrentUser() {
		const identity = await this.ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthenticated call to mutation");
		}

		const user = await this.ctx
			.table("users")
			.get("tokenIdentifier", identity.tokenIdentifier);

		if (!user) return null;

		return user;
	}
}
