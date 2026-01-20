import { useState } from "react";
import {
	Button,
	Modal,
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
	// ennen: onAdd: (row: TableRow) => void;
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
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
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
					<CalendarView onDateChange={(date) => setSelectedDate(date)} />
					{selectedDate && (
						<Text style={styles.label}>
							Valittu päivämäärä: {selectedDate.toLocaleDateString("fi-FI")}
						</Text>
					)}
					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}
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
	);
}
