import { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../Styles/CalendarStyles";

type CalendarViewProps = {
	onDateChange: (date: Date) => void;
};

export default function CalendarView({ onDateChange }: CalendarViewProps) {
	const [selectedDate, setSelectedDate] = useState<string>("");

	const handleDateChange = (day: { dateString: string }) => {
		setSelectedDate(day.dateString);
		onDateChange(new Date(day.dateString));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Valitse päivämäärä</Text>
			<Calendar
				onDayPress={handleDateChange}
				markedDates={{
					[selectedDate]: {
						selected: true,
						marked: true,
						selectedColor: "blue",
					},
				}}
			/>
			{selectedDate && (
				<Text style={styles.selectedDate}>
					Valittu päivämäärä:{" "}
					{new Date(selectedDate).toLocaleDateString("fi-FI")}
				</Text>
			)}
		</View>
	);
}
