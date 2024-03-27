import { Doc } from "@/convex/_generated/dataModel";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowDownCircle, CheckCircle2 } from "lucide-react";
import { OrderItemStatus } from "@/convex/schema";
import { startTransition } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface CardDishItemProps {
	item: Doc<"order_items"> & {
		tableName: string;
		dishName: string;
	};
}

export function CardDishItem({ item }: CardDishItemProps) {
	const inProgress = item.status === OrderItemStatus.inProgress;
	const completed = item.status === OrderItemStatus.complete;

	const updateStatus = useMutation(api.order_items.updateStatus);

	const handleUpdateStatus = () => {
		startTransition(() => {
			if (inProgress) {
				updateStatus({
					id: item._id,
					status: OrderItemStatus.complete,
				}).catch(() => toast.error("Cập nhật thất bại"));
			}

			if (completed) {
				updateStatus({
					id: item._id,
					status: OrderItemStatus.delivered,
				}).catch(() => toast.error("Cập nhật thất bại"));
			}
		});
	};

	return (
		<Card className="flex flex-row items-center justify-between">
			<CardHeader className="p-2">
				<p className="truncate text-sm">Món {item.dishName}</p>
				<CardDescription>Cho {item.tableName}</CardDescription>
			</CardHeader>
			<CardContent className="flex py-0 px-4">
				<p className="text-muted-foreground text-sm italic">
					Số lượng: {item.quantity}
				</p>
			</CardContent>
			<CardFooter className="py-0 px-2">
				<Button
					variant={"ghost"}
					size={"icon"}
					onClick={handleUpdateStatus}
				>
					<>
						{inProgress && <ArrowDownCircle className="size-6" />}
						{completed && <CheckCircle2 className="size-6" />}
					</>
				</Button>
			</CardFooter>
		</Card>
	);
}
