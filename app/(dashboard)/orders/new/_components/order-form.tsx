"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ListRestartIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MenuList, MenuListSkeleton } from "./menu-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Cart, CartSkeleton } from "./cart";
import { useCartStore } from "@/hooks/use-cart-v2";

interface OrderFormProps {
	preloadTables: Preloaded<typeof api.tables.getTables>;
	preloadedDishes: Preloaded<typeof api.dishes.getDishes>;
}

const createOrderSchema = z.object({
	tableId: z.string().min(1, {
		message: "Bạn chưa chọn bàn ăn",
	}),
	dishIds: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "Bạn phải chọn ít nhất 1 món ăn",
	}),
});
type createOrderFields = z.infer<typeof createOrderSchema>;

export function OrderForm({ preloadTables, preloadedDishes }: OrderFormProps) {
	const router = useRouter();
	const tables = usePreloadedQuery(preloadTables);
	const removeAll = useCartStore((state) => state.removeAll);
	const dishes = usePreloadedQuery(preloadedDishes);
	const createOrder = useMutation(api.orders.createOrder);

	const form = useForm<createOrderFields>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: {
			tableId: "",
			dishIds: [],
		},
	});

	const tableOptions =
		tables?.map((table) => {
			return {
				value: table._id,
				label: table.name,
			};
		}) || [];

	const handleRemoveAll = () => {
		removeAll();
		form.resetField("dishIds");
	};

	const checkValidation = () => {
		if (!form.formState.isValid) {
			toast.error("Chưa chọn bàn ăn hoặc món ăn", {
				closeButton: true,
			});
		}
	};

	const onConfirm = form.handleSubmit((data) => {
		// Tạo order
		createOrder(data)
			.then(() => {
				toast.success("Tạo order thành công");
				handleRemoveAll();
				router.replace("/orders");
			})
			.catch(() => toast.error("Tạo order thất bại"));
	});

	return (
		<Form {...form}>
			<form
				onSubmit={onConfirm}
				className="gap-y-8 gap-x-4 grid grid-cols-1 lg:grid-cols-3 auto-rows-max grid-flow-row"
			>
				<div className="col-span-2">
					<FormField
						control={form.control}
						name="tableId"
						render={({ field }) => (
							<FormItem className="max-w-xl">
								<FormLabel>Bàn ăn</FormLabel>
								<FormControl>
									<Combobox
										options={tableOptions}
										title={"Bàn ăn"}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="col-span-2">
					<FormField
						control={form.control}
						name="dishIds"
						render={({ field }) => (
							<FormItem className="border border-primary/60 rounded-lg bg-white">
								<div className="mb-4 flex justify-between items-center p-4 shadow-sm">
									<FormLabel className="font-medium text-lg">
										Danh sách món ăn
									</FormLabel>
									<Button
										type="button"
										onClick={handleRemoveAll}
									>
										<ListRestartIcon className="mr-2 size-6" />
										Reset
									</Button>
								</div>

								{!dishes && <p>Không có món ăn nào</p>}
								<FormControl>
									{dishes && (
										<MenuList
											dishes={dishes}
											onChange={field.onChange}
											value={field.value}
										/>
									)}
								</FormControl>
								<FormMessage className="p-4" />
							</FormItem>
						)}
					/>
				</div>

				<div className="lg:col-span-1 col-span-2">
					<FormField
						control={form.control}
						name="dishIds"
						render={({ field }) => (
							<Cart
								value={field.value}
								onChange={field.onChange}
								onRemoveAll={handleRemoveAll}
								onSubmit={onConfirm}
							/>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}

export function OrderFormSkeleton() {
	return (
		<div className="gap-y-8 gap-x-4 grid grid-cols-1 lg:grid-cols-3 auto-rows-max grid-flow-row">
			<div className="col-span-2">
				<Skeleton className="max-w-xl h-14" />
			</div>
			<div className="col-span-2">
				<MenuListSkeleton />
			</div>
			<div className="col-span-1">
				<CartSkeleton />
			</div>
		</div>
	);
}
