import { Doc } from "@/convex/_generated/dataModel";
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
	removeOneItem: (dish: Doc<"dishes">) => void;
	removeAll: () => void;
	decreaseQuantity: (dish: Doc<"dishes">) => void;
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
	removeOneItem(dish) {
		const currentItems = get().cartItems;
		const existingItem = currentItems.find(
			(item) => item.item._id === dish._id
		);

		if (existingItem && existingItem.quantity === 1) {
			set((state) => ({
				cartItems: state.cartItems.filter(
					(item) => item.item._id !== dish._id
				),
				totalItems: state.totalItems - 1,
				totalPrice: state.totalPrice - dish.price,
			}));
			return;
		}
		let updatedCart: cartItem[] = [];

		if (existingItem) {
			{
				updatedCart = currentItems.map((item) =>
					item.item._id === dish._id && item.quantity > 0
						? {
								quantity: item.quantity - 1,
								item: item.item,
						  }
						: item
				);
			}
		}

		set((state) => ({
			cartItems: updatedCart,
			totalItems: state.totalItems - 1,
			totalPrice: state.totalPrice - dish.price,
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
	decreaseQuantity(dish) {
		set((state) => {
			const updatedCart = state.cartItems.filter((item) => {
				if (item.item._id === dish._id && item.quantity > 0) {
					item.quantity--;

					if (item.quantity <= 0) return false;
				}

				return true;
			});
			
			return {
				cartItems: updatedCart,
			};
		});
	},
}));
