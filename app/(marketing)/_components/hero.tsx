import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
// import { useConvexAuth } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	// const { isAuthenticated, isLoading } = useConvexAuth();
	const { userId } = auth();

	return (
		<section className="container h-full flex flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
				Welcome to our Restaurant
			</h1>
			<Image
				src={"/restaurant.svg"}
				width={300}
				height={300}
				sizes="50vw"
				alt="Restaurant Image"
				priority
			/>
			{userId && (
				<Link href={"/home"}>
					<Button className="animate-bounce">Go to restaurant</Button>
				</Link>
			)}
		</section>
	);
}
