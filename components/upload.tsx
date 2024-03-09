"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Hint } from "./ui/hint";
import { useTransition } from "react";
import { deleteImage } from "@/server/deleteImage";
import { cn } from "@/lib/utils";

interface UploadProps {
	onChange: (url: string) => void;
	url: string;
}

export function Upload({ onChange, url }: UploadProps) {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		// TODO: Xóa ảnh đã upload
		startTransition(() => {
			deleteImage(url)
				.then(() => {
					toast.success("Xóa ảnh thành công");
					onChange("");
				})
				.catch(() => {
					toast.error("Xóa ảnh thất bại");
				});
		});
	};

	return (
		<>
			{url ? (
				<div
					className={cn(
						"aspect-video relative",
						isPending && "opacity-65 cursor-not-allowed"
					)}
				>
					<Hint label="Xóa ảnh" asChild>
						<Button
							className="absolute p-3 top-4 right-2 z-40 size-auto"
							variant={"destructive"}
							type="button"
							size={"icon"}
							onClick={handleDelete}
							disabled={isPending}
						>
							<Trash className="size-4" />
						</Button>
					</Hint>
					<Image
						src={url}
						fill
						alt="Dish image"
						sizes="50vw"
						className="object-contain"
					/>
				</div>
			) : (
				<UploadDropzone
					endpoint="dishImage"
					onClientUploadComplete={(res) => {
						onChange(res[0].url);
						toast.success("Tải ảnh thành công");
					}}
					onUploadError={() => {
						toast.error("Tải ảnh thất bại");
					}}
					className="aspect-video object-cover ut-button:bg-primary/80 ut-button:ut-uploading:bg-primary/60 ut-button:ut-uploading:after:bg-primary/60 ut-label:text-primary/60 ut-upload-icon:text-primary/70"
				/>
			)}
		</>
	);
}
