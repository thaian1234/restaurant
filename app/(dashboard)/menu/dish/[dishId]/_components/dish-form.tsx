"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload } from "@/components/upload";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { DeleteDish } from "./delete-dish";

interface DishFormProps {
	initialData: Preloaded<typeof api.dishes.getDishById>;
}

const createDishSchema = z.object({
	name: z.string().min(3, {
		message: "Tên món ăn tối thiểu 3 kí tự",
	}),
	price: z.coerce.number({ invalid_type_error: "Nhập giá cho món ăn" }),
	imageUrl: z.string().url({ message: "Không đúng định dạng ảnh" }),
});

type CreateDishFields = z.infer<typeof createDishSchema>;

export function DishForm({ initialData }: DishFormProps) {
	const dish = usePreloadedQuery(initialData);
	const form = useForm<CreateDishFields>({
		resolver: zodResolver(createDishSchema),
		defaultValues: {
			name: dish?.name,
			price: dish?.price || 0,
			imageUrl: dish?.imageUrl,
		},
	});
	const router = useRouter();
	const create = useMutation(api.dishes.create);
	const update = useMutation(api.dishes.update);
	const [isPending, startTransition] = useTransition();

	const onSubmit = form.handleSubmit((data) => {
		if (!data) return;

		startTransition(() => {
			if (!dish) {
				create(data)
					.then(() => {
						toast.success("Thêm món ăn thành công");
						router.replace("/menu");
					})
					.catch(() => toast.error("Thêm món ăn thất bại"));
			} else {
				update({
					id: dish._id,
					...data,
				})
					.then(() => {
						toast.success("Cập nhật món ăn thành công");
						router.refresh();
					})
					.catch(() => toast.error("Cập nhật món ăn thất bại"));
			}
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-y-10">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="border lg:col-span-2 p-4 rounded-md border-primary/70">
								<FormLabel>Ảnh món ăn</FormLabel>
								<FormControl>
									<Upload
										url={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="ml-4 flex flex-col space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên món ăn</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="Nhập tên món ăn"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá món ăn</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="Nhập giá món ăn"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="space-x-8">
					<Button isLoading={isPending} type="submit">
						{dish ? "Cập nhật" : "Xác nhận"}
					</Button>
					<DeleteDish dishId={dish?._id} />
				</div>
			</form>
		</Form>
	);
}

export function DishFormSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-y-10">
			<Skeleton className="w-full h-[450px] lg:col-span-2" />
			<div className="space-y-8">
				<Skeleton className="w-full h-14" />
				<Skeleton className="w-full h-14" />
			</div>
			<div className="space-x-8 flex items-center">
				<Skeleton className="w-32 h-14" />
				<Skeleton className="w-32 h-14" />
			</div>
		</div>
	);
}
