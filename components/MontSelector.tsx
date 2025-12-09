import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

type MonthSelectorProps = {
	onMonthChange: (month: string) => void;
	initialMonth?: string;
};

export default function MonthSelector({
	onMonthChange,
	initialMonth,
}: MonthSelectorProps) {
	const [currentMonth, setCurrentMonth] = useState<string>(
		initialMonth || new Date().toISOString().slice(0, 7), // Oletus: nykyinen kuukausi
	);

	useEffect(() => {
		if (initialMonth) {
			setCurrentMonth(initialMonth);
		}
	}, [initialMonth]);

	const handlePreviousMonth = () => {
		const date = new Date(currentMonth);
		date.setMonth(date.getMonth() - 1);
		const newMonth = date.toISOString().slice(0, 7);
		setCurrentMonth(newMonth);
		onMonthChange(newMonth);
	};

	const handleNextMonth = () => {
		const date = new Date(currentMonth);
		date.setMonth(date.getMonth() + 1);
		const newMonth = date.toISOString().slice(0, 7);
		setCurrentMonth(newMonth);
		onMonthChange(newMonth);
	};

	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Button title="<" onPress={handlePreviousMonth} />
			<Text style={{ marginHorizontal: 10 }}>
				{new Date(currentMonth).toLocaleDateString("fi-FI", {
					year: "numeric",
					month: "long",
				})}
			</Text>
			<Button title=">" onPress={handleNextMonth} />
		</View>
	);
}
