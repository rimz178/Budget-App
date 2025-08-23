import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import MainTable, { type TableRow } from "../components/MainTable";
import { styles } from "../Styles/MainStyles";

function getDaysOfMonth(year: number, month: number) {
	const days = new Date(year, month + 1, 0).getDate();
	return Array.from({ length: days }, (_, i) => i + 1);
}

export default function MainScreen() {
	const [rows, setRows] = useState<TableRow[]>([]);
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [info, setInfo] = useState("");
	const [type, setType] = useState<"tulo" | "meno">("tulo");

	useEffect(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();
		const days = getDaysOfMonth(year, month);
		const initialRows: TableRow[] = days.map((day) => ({
			title: "",
			amount: 0,
			info: "",
			date: `${year}-${(month + 1).toString().padStart(2, "0")}-${day
				.toString()
				.padStart(2, "0")}`,
			type: "tulo",
		}));
		setRows(initialRows);
	}, []);

	const handleAdd = () => {
		if (!title.trim() || !amount.trim()) return;
		setRows((prev) => [
			...prev,
			{
				title,
				amount: Number(amount),
				info,
				date: new Date().toISOString().slice(0, 10),
				type,
			},
		]);
		setTitle("");
		setAmount("");
		setInfo("");
		setType("tulo");
	};

	const deleteRow = (index: number) => {
		setRows((prev) => prev.filter((_, idx) => idx !== index));
	};

	return (
		<View style={styles.container}>
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
			<View
				style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
			>
				<Text style={{ marginRight: 8 }}>Tyyppi:</Text>
				<Button
					title={type === "tulo" ? "Tulo" : "Meno"}
					onPress={() => setType(type === "tulo" ? "meno" : "tulo")}
					color={type === "tulo" ? "green" : "red"}
				/>
			</View>
			<Button title="Lisää" onPress={handleAdd} />
			<Text style={styles.title}>Kuukauden tapahtumat</Text>
			<View style={{ maxHeight: 350, width: "100%" }}>
				<MainTable rows={rows} deleteRow={deleteRow} />
			</View>
		</View>
	);
}
