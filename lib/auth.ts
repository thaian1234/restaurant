import { auth } from "@clerk/nextjs";
import { cache } from "react";

export const getAuthToken = cache(async () => {
	return (await auth().getToken({ template: "convex" })) ?? undefined;
});
