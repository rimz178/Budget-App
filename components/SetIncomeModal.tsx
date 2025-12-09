import { useState } from "react";
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
import MontSelector from "./MontSelector";

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
	const [selectedMonth, setSelectedMonth] = useState<string | null>(
		initialMonth || null,
	);
	const [income, setIncome] = useState<string>(
		initialIncome ? String(initialIncome) : "",
	);

	const handleSave = () => {
		if (!selectedMonth || !income.trim()) return;
		onSave(selectedMonth, Number(income));
		setSelectedMonth(null);
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
					{/* Kuukauden valinta MontSelectorilla */}
					<MontSelector
						onMonthChange={(month) => setSelectedMonth(month)}
						initialMonth={selectedMonth || undefined}
					/>
					{selectedMonth && (
						<Text style={styles.infoText}>
							Valittu kuukausi:{" "}
							{new Date(selectedMonth).toLocaleDateString("fi-FI", {
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
