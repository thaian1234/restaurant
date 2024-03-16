"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Doc } from "@/convex/_generated/dataModel";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

interface MenuItemProps {
	dish: Doc<"dishes">;
	value: string[];
	onChange: (...value: any[]) => void;
}

export function MenuItem({ dish, value, onChange }: MenuItemProps) {
	const { addToCart, removeFromCart } = useCart((state) => state);

	const handleAddItem = () => {
		addToCart(dish);
		onChange([...value, dish._id]);
	};

	const handleRemoveItem = () => {
		removeFromCart(dish);
		onChange(value?.filter((value) => value !== dish._id));
	};

	return (
		<div className="grid grid-cols-[max-content_1fr_max-content] space-x-8 p-4 hover:bg-accent transition-colors rounded-md">
			<Checkbox
				key={dish._id}
				checked={value?.includes(dish._id)}
				onCheckedChange={(checked) => {
					return checked ? handleAddItem() : handleRemoveItem();
				}}
			/>
			<div className="aspect-video h-40 relative ">
				<Image
					src={dish.imageUrl}
					alt="Dish image"
					sizes="25vw"
					fill
					className="object-cover h-auto w-auto rounded-md"
				/>
			</div>
			<p>{dish.name}</p>
		</div>
	);
}


