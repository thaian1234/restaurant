"use client";

import Image from "next/image";
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
import { Upload } from "@/components/upload";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createDishSchema = z.object({
	name: z.string().min(3, {
		message: "Tên món ăn tối thiểu 3 kí tự",
	}),
	price: z.coerce.number({ invalid_type_error: "Nhập giá cho món ăn" }),
	imageUrl: z.string().url({ message: "Không đúng định dạng ảnh" }),
});

type CreateDishFields = z.infer<typeof createDishSchema>;

export function CreateForm() {
	const form = useForm<CreateDishFields>({
		resolver: zodResolver(createDishSchema),
		defaultValues: {
			name: "",
			price: 0,
			imageUrl: "",
		},
	});
	const router = useRouter();
	const create = useMutation(api.dishes.create);
	const [isPending, startTransition] = useTransition();

	const onSubmit = form.handleSubmit((data) => {
		if (!data) return;

		startTransition(() => {
			create(data)
				.then(() => {
					toast.success("Thêm món ăn thành công");
					router.replace("/menu");
				})
				.catch(() => toast.error("Thêm món ăn thất bại"));
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

				<Button
					isLoading={isPending}
					disabled={isPending}
					type="submit"
				>
					Xác nhận
				</Button>
			</form>
		</Form>
	);
}
