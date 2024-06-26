"use client";

import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { Doc } from "@/convex/_generated/dataModel";
import { MenuAcitons } from "./menu-actions";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/hooks/use-cart-v2";
import { useShallow } from "zustand/react/shallow";

interface MenuItemProps {
	dish: Doc<"dishes">;
	value: string[];
	onChange: (...value: any[]) => void;
}

export function MenuItem({ dish, value, onChange }: MenuItemProps) {
	const { addItem, decreaseQuantity, removeItem } = useCartStore(
		useShallow((state) => ({
			addItem: state.addItem,
			decreaseQuantity: state.decreaseQuantity,
			removeItem: state.removeItem,
		}))
	);

	const quantity = value.reduce(
		(acc, item) => (item === dish._id ? acc + 1 : acc),
		0
	);

	const handleAddItem = () => {
		addItem(dish);
		onChange([...value, dish._id]);
	};

	const handleRemoveItem = () => {
		const itemIndex = value.indexOf(dish._id);
		if (itemIndex === -1) return;

		if (quantity === 0) {
			removeItem(dish._id);
		} else {
			onChange(
				value.slice(0, itemIndex).concat(value.slice(itemIndex + 1))
			);
			decreaseQuantity(dish._id);
		}
	};

	return (
		<label
			className="grid grid-cols-[max-content_max-content_1fr_max-content] space-x-8 p-4 hover:bg-accent transition-colors rounded-md cursor-pointer"
			htmlFor={dish._id}
		>
			<Checkbox
				id={dish._id}
				key={dish._id}
				checked={value?.includes(dish._id) || quantity > 0}
				onCheckedChange={(checked) => {
					return checked ? handleAddItem() : handleRemoveItem();
				}}
			/>
			<div className="aspect-video h-40 relative">
				<Image
					src={dish.imageUrl}
					alt="Dish image"
					sizes="25vw"
					fill
					loading="lazy"
					placeholder="blur"
					blurDataURL="data:image/png;base64,[IMAGE_CODE_FROM_PNG_PIXEL]"
					className="object-cover rounded-md"
				/>
			</div>
			<div className="flex flex-col space-y-4">
				<p className="truncate">{dish.name}</p>
				<p className="text-muted-foreground">
					{formatPrice(dish.price)}
				</p>
			</div>
			<div className="self-start">
				<MenuAcitons
					quantity={quantity}
					handleAddItem={handleAddItem}
					handleRemoveItem={handleRemoveItem}
				/>
			</div>
		</label>
	);
}
