import { ToolboxMenu } from "@/components/toolbox-menu";
import { Hint } from "@/components/ui/hint";
import { LucideIcon } from "lucide-react";

interface ItemProps {
	label: string;
	icon: LucideIcon;
	quantity: number;
}

export function Item({ label, icon: Icon, quantity }: ItemProps) {
	return (
		<ToolboxMenu>
			<Hint label={label} asChild side="left">
				<span className="relative space-y-3">
					<span className="absolute inline-flex rounded-full size-4 bg-primary/80 items-center justify-center -right-2 p-3">
						{quantity}
					</span>
					<Icon className="size-8" />
				</span>
			</Hint>
		</ToolboxMenu>
	);
}
