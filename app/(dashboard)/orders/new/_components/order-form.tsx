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
import { useCart } from "@/hooks/use-cart";
import { ListRestartIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MenuList, MenuListSkeleton } from "./menu-list";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderFormProps {
	preloadTables: Preloaded<typeof api.tables.getTables>;
	preloadedDishes: Preloaded<typeof api.dishes.getDishes>;
}

const createOrderSchema = z.object({
	tableId: z.string().min(1, {
		message: "Bạn chưa chọn bàn ăn",
	}),
	dishIds: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "Bạn phải chọn ít nhát 1 món ăn",
	}),
});

type createOrderFields = z.infer<typeof createOrderSchema>;

export function OrderForm({ preloadTables, preloadedDishes }: OrderFormProps) {
	const router = useRouter();
	const tables = usePreloadedQuery(preloadTables);
	const dishes = usePreloadedQuery(preloadedDishes);
	const { removeAll } = useCart((state) => state);
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
				router.replace("/orders");
				router.refresh();
				return "Tạo order thành công";
			},
			error: "Tạo order thất bại",
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="gap-y-8 grid grid-cols-3">
				<div className="col-span-2 space-y-8">
					<FormField
						control={form.control}
						name="tableId"
						render={({ field }) => (
							<FormItem className="max-w-xl">
								<FormLabel>Bàn ăn</FormLabel>
								<FormControl>
									<Combobox
										options={tableOptions}
										{...field}
										title={"Bàn ăn"}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
								{dishes && (
									<MenuList dishes={dishes} {...field} />
								)}
								<FormMessage className="p-4" />
							</FormItem>
						)}
					/>
				</div>
				<div>{/* TODO: Cart */}</div>

				<Button type="submit">Xác nhận</Button>
			</form>
		</Form>
	);
}

export function OrderFormSkeleton() {
	return (
		<div className="gap-y-8 grid grid-cols-3">
			<div className="col-span-2 space-y-8">
				<Skeleton className="max-w-xl h-14" />
				<MenuListSkeleton />
			</div>
		</div>
	);
}
