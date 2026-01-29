import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

type MonthSelectorProps = {
	onMonthChange: (month: string) => void;
	initialMonth?: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const formatYYYYMM = (date: Date) =>
	`${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;

const parseYYYYMMToDate = (yyyyMM: string) => {
	const [yStr, mStr] = yyyyMM.split("-");
	const y = Number(yStr);
	const m = Number(mStr);
	return new Date(y, m - 1, 1); // paikallinen aika
};

export default function MonthSelector({
	onMonthChange,
	initialMonth,
}: MonthSelectorProps) {
	const [currentMonth, setCurrentMonth] = useState<string>(
		initialMonth || formatYYYYMM(new Date()),
	);

	useEffect(() => {
		if (initialMonth) setCurrentMonth(initialMonth);
	}, [initialMonth]);

	const handlePreviousMonth = () => {
		const date = parseYYYYMMToDate(currentMonth);
		date.setMonth(date.getMonth() - 1);
		const newMonth = formatYYYYMM(date);
		setCurrentMonth(newMonth);
		onMonthChange(newMonth);
	};

	const handleNextMonth = () => {
		const date = parseYYYYMMToDate(currentMonth);
		date.setMonth(date.getMonth() + 1);
		const newMonth = formatYYYYMM(date);
		setCurrentMonth(newMonth);
		onMonthChange(newMonth);
	};

	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Button title="<" onPress={handlePreviousMonth} />
			<Text style={{ marginHorizontal: 10 }}>
				{new Date(`${currentMonth}-01`).toLocaleDateString("fi-FI", {
					year: "numeric",
					month: "long",
				})}
			</Text>
			<Button title=">" onPress={handleNextMonth} />
		</View>
	);
}
