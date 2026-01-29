import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../Styles/CalendarStyles";
import { formatYYYYMMDD } from "../utils/dateFormatting";

type CalendarViewProps = {
	onDateChange: (date: Date) => void;
	value?: Date | null;
	hideTitle?: boolean;
	hideSelectedText?: boolean;
};

export default function CalendarView({
	onDateChange,
	value,
	hideTitle,
	hideSelectedText,
}: CalendarViewProps) {
	const valueString = value ? formatYYYYMMDD(value) : "";
	const [selectedDate, setSelectedDate] = useState<string>(valueString);

	useEffect(() => {
		setSelectedDate(valueString);
	}, [valueString]);

	const handleDateChange = (day: { dateString: string }) => {
		setSelectedDate(day.dateString);
		onDateChange(new Date(day.dateString));
	};

	return (
		<View style={styles.container}>
			{!hideTitle && <Text style={styles.title}>Valitse päivämäärä</Text>}
			<Calendar
				onDayPress={handleDateChange}
				markedDates={
					selectedDate
						? {
								[selectedDate]: {
									selected: true,
									marked: true,
									selectedColor: "blue",
								},
							}
						: {}
				}
			/>
			{selectedDate && !hideSelectedText && (
				<Text style={styles.selectedDate}>
					Valittu päivämäärä:{" "}
					{new Date(selectedDate).toLocaleDateString("fi-FI")}
				</Text>
			)}
		</View>
	);
}
