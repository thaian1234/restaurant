"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

interface DeleteAlert {
	children: React.ReactNode;
	label?: string;
	onSubmit: () => void;
}

export function ConfirmAlert({ children, onSubmit, label }: DeleteAlert) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Bạn có thật sự muốn {label} ?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Hành động này sẽ lưu dữ liệu của bạn lại!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex gap-x-3 mt-4">
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={onSubmit}>
						Xác nhận
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
