import { Doc, Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type CartItem = {
	item: Doc<"dishes">;
	quantity: number;
};

interface CartState {
	cartItems: CartItem[];
}

interface Actions {
	addItem: (dish: Doc<"dishes">) => void;
	removeItem: (id: Id<"dishes">) => void;
	increaseQuantity: (id: Id<"dishes">) => void;
	decreaseQuantity: (id: Id<"dishes">) => void;
	removeAll: () => void;
}

export const useCartStore = create<CartState & Actions>((set, get) => ({
	cartItems: [],
	addItem(dish) {
		set((state) => {
			const existingItem = state.cartItems.find(
				(item) => item.item._id === dish._id
			);

			if (existingItem) {
				state.increaseQuantity(dish._id);
			} else {
				state.cartItems.push({
					item: dish,
					quantity: 1,
				});
			}

			return {
				cartItems: state.cartItems,
			};
		});
	},
	removeItem(id) {
		set((state) => {
			const updatedCart = state.cartItems.filter(
				(i) => i.item._id !== id
			);

			return {
				cartItems: updatedCart,
			};
		});
	},
	increaseQuantity(id) {
		set((state) => {
			const updatedCart = state.cartItems.map((item) => {
				if (item.item._id === id) {
					item.quantity++;
					return item;
				}

				return item;
			});
			return { cartItems: updatedCart };
		});
	},
	decreaseQuantity(id) {
		set((state) => {
			const updatedCart = state.cartItems.filter((item) => {
				if (item.item._id === id && item.quantity > 0) {
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
	removeAll() {
		set(() => ({
			cartItems: [],
		}));
	},
}));
