import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/", "/api/uploadthing"]);

export default clerkMiddleware((auth, req) => {
	if (isPublicRoutes(req)) return;

	auth().protect();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
