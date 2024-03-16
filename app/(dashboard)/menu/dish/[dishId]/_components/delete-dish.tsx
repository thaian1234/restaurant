"use client";

import { DeleteAlert } from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteDishProps {
	dishId: Id<"dishes"> | undefined;
}

export function DeleteDish({ dishId }: DeleteDishProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const deleteDish = useMutation(api.dishes.deleteById);

	const handleDeleteDish = () => {
		if (!dishId) return toast.error("Xóa món ăn thất bại");

		startTransition(() => {
			deleteDish({ id: dishId })
				.then(() => {
					toast.success("Xóa món ăn thành công");
					router.replace("/menu");
				})
				.catch(() => {
					toast.error("Xóa món ăn thất bại");
				});
		});
	};

	return (
		<>
			{!!dishId && (
				<DeleteAlert onSubmit={handleDeleteDish}>
					<Button
						variant={"ghost"}
						type="button"
						className="text-rose-500 border border-rose-500 hover:bg-transparent hover:text-rose-600/80"
						disabled={!dishId || isPending}
					>
						Xóa món ăn
					</Button>
				</DeleteAlert>
			)}
		</>
	);
}
