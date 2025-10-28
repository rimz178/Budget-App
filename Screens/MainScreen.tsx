import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import MainTable from "../components/MainTable";
import type { TableRow } from "../components/types";
import { styles } from "../Styles/MainStyles";

export default function MainScreen() {
	const [budgetCreated, setBudgetCreated] = useState(false);
	const [budgetName, setBudgetName] = useState("");
	const [monthlyIncome, setMonthlyIncome] = useState("");
	const [rows, setRows] = useState<TableRow[]>([]);
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [info, setInfo] = useState("");
	const [type, setType] = useState<"tulo" | "meno">("tulo");

	useEffect(() => {
		const loadData = async () => {
			try {
				const json = await AsyncStorage.getItem("@budget_data");
				if (!json) return;
				const parsed = JSON.parse(json);
				if (parsed.budgetName) setBudgetName(parsed.budgetName);
				if (parsed.monthlyIncome)
					setMonthlyIncome(String(parsed.monthlyIncome));
				if (Array.isArray(parsed.rows)) setRows(parsed.rows);
				if (parsed.budgetCreated) setBudgetCreated(true);
			} catch (e) {
				console.error("Error loading data", e);
			}
		};
		loadData();
	}, []);

	const storeData = async (
		nextRows: TableRow[],
		nextBudgetName = budgetName,
		nextMonthlyIncome = monthlyIncome,
		nextBudgetCreated = budgetCreated,
	) => {
		try {
			const jsonValue = JSON.stringify({
				budgetName: nextBudgetName,
				monthlyIncome: nextMonthlyIncome,
				rows: nextRows,
				budgetCreated: nextBudgetCreated,
			});
			await AsyncStorage.setItem("@budget_data", jsonValue);
		} catch (e) {
			console.error("Error saving data", e);
		}
	};

	const handleCreateBudget = () => {
		if (!monthlyIncome.trim()) return;
		setBudgetCreated(true);
		const newRows: TableRow[] = [];
		setRows(newRows);
		storeData(newRows, budgetName, monthlyIncome, true);
	};

	const handleAdd = () => {
		if (!title.trim() || !amount.trim()) return;
		const newRow: TableRow = {
			title,
			amount: Math.abs(Number(amount)),
			info,
			date: new Date().toISOString().slice(0, 10),
			type,
		};
		const newRows = [...rows, newRow];
		setRows(newRows);
		storeData(newRows, budgetName, monthlyIncome, true);

		setTitle("");
		setAmount("");
		setInfo("");
		setType("tulo");
	};

	const deleteRow = (index: number) => {
		const newRows = rows.filter((_, idx) => idx !== index);
		setRows(newRows);
		storeData(newRows, budgetName, monthlyIncome, true);
	};

	const incomeNumber = Number(monthlyIncome || 0);

	if (!budgetCreated) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Luo uusi budjetti</Text>
				<TextInput
					style={styles.input}
					value={budgetName}
					onChangeText={setBudgetName}
					placeholder="Budjetin nimi (esim. Lokakuu)"
				/>
				<TextInput
					style={styles.input}
					value={monthlyIncome}
					onChangeText={setMonthlyIncome}
					placeholder="Kuukausitulosi (€)"
					keyboardType="numeric"
				/>
				<Button title="Luo budjetti" onPress={handleCreateBudget} />
				<Text style={{ marginTop: 12, color: "#666" }}>
					Budjetin luomisen jälkeen voit lisätä tuloja ja menoja.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{budgetName || "Budjetti"}</Text>

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
				{rows.length === 0 ? (
					<Text style={{ color: "#666" }}>
						Ei tapahtumia — lisää ensimmäinen yllä.
					</Text>
				) : (
					<MainTable rows={rows} deleteRow={deleteRow} income={incomeNumber} />
				)}
			</View>
		</View>
	);
}
