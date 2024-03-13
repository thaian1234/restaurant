import { auth } from "@clerk/nextjs";
import { cache } from "react";

// export async function getAuthToken() {
// 	return (await auth().getToken({ template: "convex" })) ?? undefined;
// }

export const getAuthToken = cache(async () => {
	return (await auth().getToken({ template: "convex" })) ?? undefined;
});
