// Date formatting utilities using local timezone

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const formatYYYYMM = (date: Date) =>
	`${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;

export const formatYYYYMMDD = (date: Date) =>
	`${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
