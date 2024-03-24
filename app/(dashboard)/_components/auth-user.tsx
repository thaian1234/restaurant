"use client";

import useStoreUser from "@/hooks/use-store-user";

export function AuthUser() {
	const userId = useStoreUser();
	return null;
}
