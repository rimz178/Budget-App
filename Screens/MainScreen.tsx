import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AddTransactionModal from "../components/AddTransactionModal";
import MainTable from "../components/MainTable";
import type { TableRow } from "../components/types";
import { styles } from "../Styles/MainStyles";

export default function MainScreen() {
	const [budgetCreated, setBudgetCreated] = useState(false);
	const [budgetName, setBudgetName] = useState("");
	const [monthlyIncome, setMonthlyIncome] = useState("");
	const [rows, setRows] = useState<TableRow[]>([]);
	const [modalVisible, setModalVisible] = useState(false);

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

	const handleAddTransaction = (newRow: TableRow) => {
		const newRows = [...rows, newRow];
		setRows(newRows);
		storeData(newRows, budgetName, monthlyIncome, true);
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
				<Text style={styles.infoText}>
					Budjetin luomisen jälkeen voit lisätä tuloja ja menoja.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{budgetName || "Budjetti"}</Text>

			<Button
				title="Lisää tulo tai meno"
				onPress={() => setModalVisible(true)}
			/>

			<Text style={styles.title}>Kuukauden tapahtumat</Text>
			<View style={styles.tableContainer}>
				{rows.length === 0 ? (
					<Text style={styles.emptyText}>
						Ei tapahtumia — lisää ensimmäinen yllä.
					</Text>
				) : (
					<MainTable rows={rows} deleteRow={deleteRow} income={incomeNumber} />
				)}
			</View>

			<AddTransactionModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onAdd={handleAddTransaction}
			/>
		</View>
	);
}
