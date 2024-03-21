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
	const dishes = usePreloadedQuery(preloadedDishes);
	const { removeAll } = useCartStore((state) => state);
	const createOrder = useMutation(api.orders.create);
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

	const onSubmit = form.handleSubmit((data) => {
		const promise = createOrder(data);

		toast.promise(promise, {
			loading: "Đang tạo order...",
			success: () => {
				return "Tạo order thành công";
			},
			error: "Tạo order thất bại",
		});
		
		router.replace("/orders");
		router.refresh();
	});

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
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

				<div className="col-span-1">
					<FormField
						control={form.control}
						name="dishIds"
						render={({ field }) => (
							<Cart
								value={field.value}
								onChange={field.onChange}
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
