import { ReactNode } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

interface ToolboxMenuProps {
	children: ReactNode;
}

export function ToolboxMenu({ children }: ToolboxMenuProps) {
	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent>
				<SheetTitle>Danh sách Waitlist</SheetTitle>
				<SheetDescription>
					{/* TODO: Load danh sach order item */}
				</SheetDescription>
			</SheetContent>
		</Sheet>
	);
}
