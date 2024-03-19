import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { MinusIcon, PlusIcon } from "lucide-react";

interface MenuAcitonsProps {
	quantity: number;
	handleAddItem: () => void;
	handleRemoveItem: () => void;
}

export function MenuAcitons({
	quantity,
	handleAddItem,
	handleRemoveItem,
}: MenuAcitonsProps) {
	return (
		<div className="flex space-x-2 flex-row items-center">
			<Button
				type="button"
				size={"icon"}
				className="size-7"
				onClick={handleRemoveItem}
				disabled={quantity === 0}
			>
				<MinusIcon className="size-4" />
			</Button>
			<span>{quantity}</span>
			<Button
				type="button"
				size={"icon"}
				className="size-7"
				onClick={handleAddItem}
			>
				<PlusIcon className="size-4" />
			</Button>
		</div>
	);
}
