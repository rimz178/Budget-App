import { useEffect, useMemo, useState } from "react";
import {
	Button,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Text,
	TextInput,
	View,
} from "react-native";
import { styles } from "../Styles/SetIncomeModalStyles";
import MonthSelector from "./MonthSelector";

type SetIncomeModalProps = {
	visible: boolean;
	onClose: () => void;
	onSave: (month: string, income: number) => void;
	initialMonth?: string;
	initialIncome?: number;
};

export default function SetIncomeModal({
	visible,
	onClose,
	onSave,
	initialMonth,
	initialIncome,
}: SetIncomeModalProps) {
	// ennen: const getCurrentMonth = () => new Date().toISOString().slice(0, 7);
	const currentMonth = useMemo(
		() => new Date().toISOString().slice(0, 7),
		[],
	);

	const [selectedMonth, setSelectedMonth] = useState<string | null>(
		initialMonth ?? currentMonth,
	);
	const [income, setIncome] = useState<string>(
		initialIncome ? String(initialIncome) : "",
	);

	useEffect(() => {
		setSelectedMonth(initialMonth ?? currentMonth);
		setIncome(initialIncome ? String(initialIncome) : "");
	}, [initialMonth, initialIncome, currentMonth]);

	const handleSave = () => {
		if (!selectedMonth) return;
		const sanitized = income.replace(/\s/g, "").replace(",", ".");
		const parsedIncome = Number(sanitized);
		if (!Number.isFinite(parsedIncome) || parsedIncome <= 0) {
			return;
		}
		onSave(selectedMonth, parsedIncome);
		setIncome("");
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={styles.modalContainer}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Aseta kuukausitulot</Text>
					<MonthSelector
						onMonthChange={(month) => setSelectedMonth(month)}
						initialMonth={selectedMonth || undefined}
					/>
					{selectedMonth && (
						<Text style={styles.infoText}>
							Valittu kuukausi:{" "}
					 	{new Date(`${selectedMonth}-01`).toLocaleDateString("fi-FI", {
								year: "numeric",
								month: "long",
						})}
						</Text>
					)}
					<TextInput
						style={styles.input}
						value={income}
						onChangeText={setIncome}
						placeholder="Kuukausitulosi (€)"
						keyboardType="numeric"
					/>
					<View style={styles.buttonRow}>
						<Button title="Peruuta" onPress={onClose} />
						<Button title="Tallenna" onPress={handleSave} />
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}
