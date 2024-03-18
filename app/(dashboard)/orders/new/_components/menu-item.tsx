"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Doc } from "@/convex/_generated/dataModel";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { MenuAcitons } from "./menu-actions";
import { formatPrice } from "@/lib/format";

interface MenuItemProps {
	dish: Doc<"dishes">;
	value: string[];
	onChange: (...value: any[]) => void;
	quantity: number;
}

export function MenuItem({ dish, value, onChange, quantity }: MenuItemProps) {
	const { addToCart, removeOneItem } = useCart((state) => state);

	const handleAddItem = () => {
		addToCart(dish);
		onChange([...value, dish._id]);
	};

	const handleRemoveItem = () => {
		if (quantity === 0) {
			onChange(value?.filter((value) => value !== dish._id));
		} else {
			// Lấy danh sách id món ăn hiện có trong giỏ hàng
			const cartItemIds = value.slice();

			// Tìm vị trí của id món ăn cần giảm trong danh sách
			const itemIndex = cartItemIds.indexOf(dish._id);

			// Nếu món ăn không có trong giỏ hàng, bỏ qua
			if (itemIndex === -1) {
				return;
			}

			// Xóa id món ăn khỏi danh sách
			cartItemIds.splice(itemIndex, 1);
			//Xóa đi một món ăn trong giỏ hàng
			onChange(cartItemIds);
			removeOneItem(dish);
		}
	};

	return (
		<li className="grid grid-cols-[max-content_max-content_1fr_max-content] space-x-8 p-4 hover:bg-accent transition-colors rounded-md">
			<Checkbox
				id={dish._id}
				key={dish._id}
				checked={value?.includes(dish._id) || quantity >= 1}
				onCheckedChange={(checked) => {
					return checked ? handleAddItem() : handleRemoveItem();
				}}
			/>
			<label
				className="aspect-video h-40 relative cursor-pointer"
				htmlFor={dish._id}
			>
				<Image
					src={dish.imageUrl}
					alt="Dish image"
					sizes="25vw"
					fill
					className="object-cover size-auto rounded-md"
				/>
			</label>
			<div className="flex flex-col space-y-4">
				<label htmlFor={dish._id} className="cursor-pointer">
					{dish.name}
				</label>
				<p className="text-muted-foreground">
					{formatPrice(dish.price)}
				</p>
			</div>
			<div className="">
				<MenuAcitons
					quantity={quantity}
					handleAddItem={handleAddItem}
					handleRemoveItem={handleRemoveItem}
				/>
			</div>
		</li>
	);
}
