export function formatPrice(number: number) {
	const formatter = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	});

	return formatter.format(number);
}
