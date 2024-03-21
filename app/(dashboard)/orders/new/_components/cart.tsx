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
import { ShoppingCartIcon, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

interface CartProps {
	value: string[];
	onChange: (...value: any[]) => void;
}

export function Cart({ value, onChange }: CartProps) {
	const { cartItems, removeItem } = useCartStore((state) => state);

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

	return (
		<Card className="h-[585px] border border-primary/60 rounded-lg flex-col flex">
			<CardHeader className="">
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
							<li
								key={item.item._id}
								className="flex items-center space-x-4"
							>
								<p className="line-clamp-1">{item.item.name}</p>
								<p className="flex-1 italic">
									x{item.quantity}
								</p>
								<div className="flex items-center">
									<p className="line-clamp-1">
										{formatPrice(
											item.item.price * item.quantity
										)}
									</p>
									<Button
										className="hover:bg-transparent hover:text-rose-400"
										size={"icon"}
										variant={"ghost"}
										onClick={() =>
											handleRemoveItem(item.item._id)
										}
									>
										<X className="size-4" />
									</Button>
								</div>
							</li>
						))}
					</ul>
				</CardContent>
			</ScrollArea>
			<Separator />

			<CardFooter className="flex flex-col space-y-3 items-end mt-4">
				<div className="space-y-2">
					<li className="flex items-center space-x-2">
						<p className="line-clamp-1">Tổng tiền: </p>
						<p className="italic line-clamp-1">
							{formatPrice(totalPrice())}
						</p>
					</li>
					<div className="flex flex-row justify-between space-x-2">
						<Button variant={"outline"} type="button" size={"sm"}>
							Hủy
						</Button>
						<Button type="submit" size={"sm"}>
							Xác nhận
						</Button>
					</div>
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
