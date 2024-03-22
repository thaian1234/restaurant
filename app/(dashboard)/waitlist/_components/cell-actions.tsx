"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { OrderItemStatus } from "@/convex/schema";
import { useMutation } from "convex/react";
import { ArrowUpCircle, CheckCircle2Icon, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface CellActionsProps {
	id: Id<"order_items">;
	currentStatus: OrderItemStatus;
}

export function CellActions({ id, currentStatus }: CellActionsProps) {
	const updatedStatus = useMutation(api.order_items.updateStatus);
	const [isPending, startTransition] = useTransition();

	const inProgress = currentStatus === OrderItemStatus.inProgress;
	const complete = currentStatus === OrderItemStatus.complete;

	const handleUpdateStatus = (status: OrderItemStatus) => {
		startTransition(() => {
			updatedStatus({
				id,
				status,
			})
				.then(() => {
					toast.success("Cập nhật thành công");
				})
				.catch(() => toast.error("Cập nhật thất bại"));
		});
	};

	return (
		<>
			{inProgress && (
				<Hint label="Nấu xong" asChild side="right">
					<Button
						disabled={isPending}
						variant={"ghost"}
						size={"icon"}
						onClick={() =>
							handleUpdateStatus(OrderItemStatus.complete)
						}
					>
						{!isPending ? (
							<ArrowUpCircle />
						) : (
							<Loader2 className="animate-spin" />
						)}
					</Button>
				</Hint>
			)}
			{complete && (
				<Hint asChild side="right" label="Đã giao">
					<Button
						disabled={isPending}
						variant={"ghost"}
						size={"icon"}
						onClick={() =>
							handleUpdateStatus(OrderItemStatus.delivered)
						}
					>
						{!isPending ? (
							<CheckCircle2Icon />
						) : (
							<Loader2 className="animate-spin" />
						)}
					</Button>
				</Hint>
			)}
		</>
	);
}
