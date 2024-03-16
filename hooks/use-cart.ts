import { Doc } from "@/convex/_generated/dataModel";
import { Ent } from "@/convex/types";
import { create } from "zustand";

type cartItem = {
	item: Doc<"dishes">;
	quantity: number;
};

interface CartState {
	cartItems: cartItem[];
	totalItems: number;
	totalPrice: number;
}

interface Actions {
	addToCart: (dish: Doc<"dishes">) => void;
	removeFromCart: (dish: Doc<"dishes">) => void;
	removeAll: () => void;
}

export const useCart = create<CartState & Actions>((set, get) => ({
	cartItems: [],
	totalItems: 0,
	totalPrice: 0,
	addToCart(dish) {
		const currentItems = get().cartItems;
		const existingItem = currentItems.find(
			(item) => item.item._id === dish._id
		);

		let updatedCart: cartItem[] = [];

		if (existingItem) {
			updatedCart = currentItems.map((item) =>
				item.item._id === dish._id
					? { quantity: item.quantity + 1, item: item.item }
					: item
			);
		} else {
			updatedCart = [
				...currentItems,
				{
					item: dish,
					quantity: 1,
				},
			];
		}

		set((state) => ({
			cartItems: updatedCart,
			totalItems: state.totalItems + 1,
			totalPrice: state.totalPrice + dish.price,
		}));
	},
	removeAll() {
		set(() => ({
			cartItems: [],
			totalItems: 0,
			totalPrice: 0,
		}));
	},
	removeFromCart(dish) {
		set((state) => ({
			cartItems: state.cartItems.filter(
				(item) => item.item._id !== dish._id
			),
			totalItems: state.totalItems - 1,
			totalPrice: state.totalPrice - dish.price,
		}));
	},
}));
