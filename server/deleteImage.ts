"use server";

import { getImageId } from "@/lib/uploadthing";
import { UTApi } from "uploadthing/server";

export const deleteImage = async (url: string) => {
	const utApi = new UTApi();
	const imageId = getImageId(url);

	await utApi.deleteFiles(imageId as string);
};
