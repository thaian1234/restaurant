import {
	generateUploadButton,
	generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { z } from "zod";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const getImageId = (url: string) => {
	if (!z.string().url().safeParse(url)) return;

	const imageId = url.split("/");

	return imageId.at(-1);
};
