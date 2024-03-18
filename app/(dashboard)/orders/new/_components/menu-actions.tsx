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
		<div className="flex space-x-3 flex-row items-center">
			<Button
				type="button"
				size={"icon"}
				className="size-7"
				onClick={handleRemoveItem}
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
