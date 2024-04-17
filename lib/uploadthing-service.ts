import * as z from "zod";

export const getImageId = (url: string) => {
	if (!z.string().url().safeParse(url)) return;

	const imageId = url.split("/");

	return imageId.at(-1);
};
