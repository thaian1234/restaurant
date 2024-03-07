"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Hint } from "./ui/hint";

interface UploadProps {
	onChange: (url: string) => void;
	url: string;
}

export function Upload({ onChange, url }: UploadProps) {
	const handleDelete = async () => {
		// TODO: Xóa ảnh đã upload
	};

	return (
		<>
			{url ? (
				<div className="aspect-video relative">
					<Hint label="Xóa ảnh" asChild>
						<Button
							className="absolute p-3 top-4 right-2 z-40 bg-rose-500/30 hover:bg-rose-500/30 size-auto"
							variant={"ghost"}
							type="button"
							size={"icon"}
						>
							<Trash className="size-4 text-rose-800/90" />
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
					className="aspect-video object-cover ut-button:bg-primary/80 ut-button:ut-uploading:bg-primary/60 ut-button:ut-uploading:after:bg-primary/60"
				/>
			)}
		</>
	);
}
