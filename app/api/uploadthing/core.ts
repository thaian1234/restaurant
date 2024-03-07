import { getAuthToken } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
	// This code runs on your server before upload
	const authToken = await getAuthToken();
	// If you throw, the user will not be able to upload
	if (!authToken) throw new UploadThingError("Unauthorized");

	// Whatever is returned here is accessible in onUploadComplete as `metadata`
	return { authToken: authToken };
};

export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	dishImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(handleAuth)
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
