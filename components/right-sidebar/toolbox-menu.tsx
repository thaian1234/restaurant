import { ReactNode } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { ListCardDish } from "./list-card-dish";

interface ToolboxMenuProps {
	children: ReactNode;
}

export function ToolboxMenu({ children }: ToolboxMenuProps) {
	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Danh sách Waitlist</SheetTitle>
				</SheetHeader>
				<div className="mt-6">
					<ListCardDish />
				</div>
			</SheetContent>
		</Sheet>
	);
}
