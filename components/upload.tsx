"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";

interface UploadProps {
	onChange: (url: string) => void;
	url: string;
}

export function Upload({ onChange, url }: UploadProps) {
	return (
		<>
			{url ? (
				<div className="aspect-video relative">
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
					className="aspect-video object-cover"
				/>
			)}
		</>
	);
}
