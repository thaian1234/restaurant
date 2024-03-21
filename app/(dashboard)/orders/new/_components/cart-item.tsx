import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { CartItem as Item } from "@/hooks/use-cart-v2";
import { formatPrice } from "@/lib/format";
import { X } from "lucide-react";

interface CartItemProps {
	item: Item;
	onRemoveItem: (id: Id<"dishes">) => void;
}

export function CartItem({ item, onRemoveItem }: CartItemProps) {
	return (
		<li key={item.item._id} className="flex items-center space-x-4">
			<p className="line-clamp-1">{item.item.name}</p>
			<p className="flex-1 italic">x{item.quantity}</p>
			<div className="flex items-center">
				<p className="line-clamp-1">
					{formatPrice(item.item.price * item.quantity)}
				</p>
				<Button
					className="hover:bg-transparent hover:text-rose-400"
					size={"icon"}
					variant={"ghost"}
					onClick={() => onRemoveItem(item.item._id)}
				>
					<X className="size-4" />
				</Button>
			</div>
		</li>
	);
}
