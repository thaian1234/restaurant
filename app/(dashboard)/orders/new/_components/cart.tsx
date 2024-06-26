import { DeleteAlert } from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/hooks/use-cart-v2";
import { formatPrice } from "@/lib/format";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItem } from "./cart-item";
import { ConfirmAlert } from "@/components/confirm-alert";

interface CartProps {
	value: string[];
	onChange: (...value: any[]) => void;
	onRemoveAll: () => void;
	onSubmit: () => void;
}

export function Cart({ value, onChange, onRemoveAll, onSubmit }: CartProps) {
	const router = useRouter();
	const { cartItems, removeItem } = useCartStore((state) => {
		return {
			cartItems: state.cartItems,
			removeItem: state.removeItem,
		};
	});

	const totalPrice = () => {
		return cartItems.reduce((acc, currItem) => {
			acc += currItem.item.price * currItem.quantity;
			return acc;
		}, 0);
	};

	const handleRemoveItem = (id: Id<"dishes">) => {
		removeItem(id);
		onChange(value?.filter((value) => value !== id));
	};

	const handleRemoveAll = () => {
		onRemoveAll();
		router.replace("/orders");
	};

	return (
		<Card className="h-[585px] border border-primary/60 rounded-lg flex-col flex">
			<CardHeader>
				<CardTitle className="flex items-center">
					<ShoppingCartIcon className="size-6 mr-4" />
					<span>Giỏ hàng</span>
				</CardTitle>
			</CardHeader>

			<Separator />

			<ScrollArea className="h-full">
				<CardContent className="mt-3 flex-1 flex">
					<ul className="flex-1">
						{cartItems.map((item) => (
							<CartItem
								key={item.item._id}
								item={item}
								onRemoveItem={handleRemoveItem}
							/>
						))}
					</ul>
				</CardContent>
			</ScrollArea>
			<Separator />

			<CardFooter className="flex flex-col space-y-3 items-end mt-4">
				<li className="flex items-center space-x-2">
					<p className="line-clamp-1">Tổng tiền: </p>
					<p className="italic line-clamp-1">
						{formatPrice(totalPrice())}
					</p>
				</li>
				<div className="flex flex-row justify-between space-x-4">
					<DeleteAlert onSubmit={handleRemoveAll}>
						<Button variant={"outline"} type="button" size={"sm"}>
							Hủy
						</Button>
					</DeleteAlert>
					<ConfirmAlert label="tạo order" onSubmit={onSubmit}>
						<Button size={"sm"} type="button">
							Xác nhận
						</Button>
					</ConfirmAlert>
				</div>
			</CardFooter>
		</Card>
	);
}

export function CartSkeleton() {
	return (
		<div className="w-full h-[585px]">
			<Skeleton className="size-full" />
		</div>
	);
}
