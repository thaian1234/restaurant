"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
	options: { label: string; value: string }[];
	value?: string;
	onChange: (value: string) => void;
	title: string;
}

export const Combobox = ({
	options,
	value,
	onChange,
	title,
}: ComboboxProps) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? options.find((option) => option.value === value)
								?.label
						: `Chọn ${title.toLowerCase()}...`}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-full p-0"
				align="start"
				side="right"
				sideOffset={20}
			>
				<Command>
					<CommandInput placeholder={`Tìm ${title.toLowerCase()}`} />
					<CommandList>
						<CommandEmpty>Không tìm thấy bàn ăn.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => {
										onChange(option.value);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
