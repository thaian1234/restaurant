import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	size: number;
	href: string;
	label?: string;
}

export function Logo({ size, href, label }: LogoProps) {
	return (
		<Link href={href} className={cn(!!label && "flex items-center")}>
			<Image
				src="/logo.svg"
				width={size}
				height={size}
				alt="Logo"
				sizes="50vw"
				priority
			/>
			{label}
		</Link>
	);
}
