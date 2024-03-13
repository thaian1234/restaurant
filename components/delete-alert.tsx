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
	onSubmit: () => void;
}

export function DeleteAlert({ children, onSubmit }: DeleteAlert) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Bạn có thật sự muốn xóa ?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Hành động này sẽ xóa hoàn toàn dữ liệu của bạn!
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
