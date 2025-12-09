import React, { useState } from "react";
import {
	Button,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "../Styles/TransactionStyles";
import type { TableRow } from "./types";

type AddTransactionModalProps = {
	visible: boolean;
	onClose: () => void;
	onAdd: (row: TableRow) => void;
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

	const handleAdd = () => {
		if (!title.trim() || !amount.trim()) return;
		const newRow: TableRow = {
			title,
			amount: Math.abs(Number(amount)),
			info,
			date: new Date().toISOString().slice(0, 10),
			type,
		};
		onAdd(newRow);
		setTitle("");
		setAmount("");
		setInfo("");
		setType("tulo");
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
