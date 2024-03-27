import { api } from "@/convex/_generated/api";
import { OrderItemStatus } from "@/convex/schema";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { CardDishItem } from "./card-dish-item";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

export function ListCardDish() {
	const orderItems = useQuery(api.order_items.getOrderItems, {});

	if (orderItems === undefined) return <Loader2 className="size-6" />;
	if (orderItems === null) return null;

	const orderItemsInProgress = orderItems.filter(
		(item) => item.status === OrderItemStatus.inProgress
	);

	const orderItemsCompleted = orderItems.filter(
		(item) => item.status === OrderItemStatus.complete
	);

	return (
		<>
			<Accordion type="multiple" className="w-full">
				<AccordionItem value="order-inprogress">
					<AccordionTrigger>
						<p className="text-sm">
							Danh sách món ăn đang làm (
							{orderItemsInProgress.length})
						</p>
					</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col space-y-3">
							{orderItemsInProgress.map((item) => (
								<li key={item._id}>
									<CardDishItem item={item} />
								</li>
							))}
						</ul>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="order-completed">
					<AccordionTrigger>
						<p className="text-sm">
							Danh sách món ăn làm xong (
							{orderItemsCompleted.length})
						</p>
					</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col space-y-3">
							{orderItemsCompleted.map((item) => (
								<li key={item._id}>
									<CardDishItem item={item} />
								</li>
							))}
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
