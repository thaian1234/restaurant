import Image from "next/image";

export function Loading() {
	return (
		<div className="size-full flex justify-center items-center bg-background">
			<Image
				src="/logo.svg"
				width={120}
				height={120}
				className="animate-pulse duration-700"
				priority
				sizes="50vw"
				alt="Loading logo"
			/>
		</div>
	);
}
