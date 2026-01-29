import { useEffect, useState } from "react";
import {
	Button,
	Modal,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "../Styles/TransactionStyles";
import CalendarView from "./CalendarView";
import type { TableRow } from "./types";

type AddTransactionModalProps = {
	visible: boolean;
	onClose: () => void;
	onAdd: (row: Omit<TableRow, "id">) => void;
};

export default function AddTransactionModal({
	visible,
	onClose,
	onAdd,
}: AddTransactionModalProps) {
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [info, setInfo] = useState("");
	const [type, setType] = useState<"tulo" | "meno">("tulo");
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	useEffect(() => {
		if (!visible) {
			setIsDatePickerOpen(false);
		}
	}, [visible]);

	const handleClose = () => {
		setIsDatePickerOpen(false);
		onClose();
	};

	const handleAdd = () => {
		if (!title.trim() || !amount.trim() || !selectedDate) return;
		const sanitized = amount.replace(/\s/g, "").replace(",", ".");
		const parsed = Number(sanitized);
		if (!Number.isFinite(parsed) || parsed <= 0) return;

		const newRow: Omit<TableRow, "id"> = {
			title,
			amount: Math.abs(parsed),
			info,
			date: selectedDate.toISOString().slice(0, 10),
			type,
		};

		onAdd(newRow);
		setTitle("");
		setAmount("");
		setInfo("");
		setType("tulo");
		setSelectedDate(new Date());
		handleClose();
	};

	const dateLabel = selectedDate
		? selectedDate.toLocaleDateString("fi-FI")
		: "Valitse päivämäärä";

	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible && !isDatePickerOpen}
				onRequestClose={handleClose}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Lisää tulo tai meno</Text>

						<TextInput
							style={styles.input}
							value={title}
							onChangeText={setTitle}
							placeholder="Nimi"
						/>

						<TextInput
							style={styles.input}
							value={amount}
							onChangeText={setAmount}
							placeholder="Summa"
							keyboardType="numeric"
						/>

						<TextInput
							style={styles.input}
							value={info}
							onChangeText={setInfo}
							placeholder="Lisätietoa"
						/>

						<View style={styles.row}>
							<Text style={styles.label}>Tyyppi:</Text>
							<Button
								title={type === "tulo" ? "Tulo" : "Meno"}
								onPress={() => setType(type === "tulo" ? "meno" : "tulo")}
								color={type === "tulo" ? "green" : "red"}
							/>
						</View>

						<TouchableOpacity
							style={styles.datePickerButton}
							onPress={() => setIsDatePickerOpen(true)}
						>
							<Text
								style={[
									styles.datePickerText,
									!selectedDate && styles.datePickerPlaceholder,
								]}
							>
								{dateLabel}
							</Text>
						</TouchableOpacity>

						<View style={styles.buttonRow}>
							<TouchableOpacity
								style={[styles.button, styles.cancelButton]}
								onPress={handleClose}
							>
								<Text style={styles.buttonText}>Peruuta</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.addButton]}
								onPress={handleAdd}
							>
								<Text style={styles.buttonText}>Lisää</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<Modal
				animationType="fade"
				transparent={true}
				visible={visible && isDatePickerOpen}
				onRequestClose={() => setIsDatePickerOpen(false)}
			>
				<View style={styles.modalContainer}>
					<Pressable
						style={styles.backdrop}
						onPress={() => setIsDatePickerOpen(false)}
					/>
					<View style={styles.smallModalContent}>
						<CalendarView
							value={selectedDate}
							hideSelectedText={true}
							onDateChange={(date) => {
								setSelectedDate(date);
								setIsDatePickerOpen(false);
							}}
						/>
						<View style={styles.dateModalButtonRow}>
							<Button
								title="Sulje"
								onPress={() => setIsDatePickerOpen(false)}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}
