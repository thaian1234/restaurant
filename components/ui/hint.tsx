import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { ReactNode } from "react";

interface HintProps {
	label: string;
	children: ReactNode;
	asChild?: boolean;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

export function Hint({ label, children, asChild, side, align }: HintProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className="text-muted-foreground bg-white"
					side={side}
					align={align}
					sideOffset={10}
				>
					<p className="font-bold">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
