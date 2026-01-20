import { useState } from "react";
import { Button, Text, View } from "react-native";
import AddTransactionModal from "../components/AddTransactionModal";
import MainTable from "../components/MainTable";
import MonthSelector from "../components/MonthSelector";
import SetIncomeModal from "../components/SetIncomeModal";
import type { TableRow } from "../components/types";
import { useBudget } from "../contexts/BudgetContext";
import { styles } from "../Styles/MainStyles";

export default function MainScreen() {
	const {
		rows,
		monthlyIncomes,
		addTransaction,
		saveIncome,
		deleteTransaction,
	} = useBudget();
	const [modalVisible, setModalVisible] = useState(false);
	const [incomeModalVisible, setIncomeModalVisible] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState<string | null>(
		new Date().toISOString().slice(0, 7),
	);

	const incomeForSelectedMonth = selectedMonth
		? monthlyIncomes.find((mi) => mi.month === selectedMonth)?.income || 0
		: 0;

	const filteredRows = selectedMonth
		? rows.filter((row) => row.date?.startsWith(selectedMonth))
		: rows;

	const handleSaveIncome = (month: string, income: number) => {
		saveIncome(month, income);
		setSelectedMonth(month);
		setIncomeModalVisible(false);
	};

	
	const handleAddTransaction = (row: Omit<TableRow, "id">) => {
		const newRow: TableRow = {
			...row,
			id: Date.now().toString(),
		};
		addTransaction(newRow);

		setSelectedMonth(row.date ? row.date.slice(0, 7) : null);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Budjetti</Text>

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
					})}{" "}
					- Tulot: {incomeForSelectedMonth} €
				</Text>
			)}

			<Button
				title="Aseta kuukausitulot"
				onPress={() => setIncomeModalVisible(true)}
			/>
			<Button
				title="Lisää tulo tai meno"
				onPress={() => setModalVisible(true)}
			/>

			<Text style={styles.title}>Kuukauden tapahtumat</Text>
			<View style={styles.tableContainer}>
				{filteredRows.length === 0 ? (
					<Text style={styles.emptyText}>
						Ei tapahtumia — lisää ensimmäinen yllä.
					</Text>
				) : (
					<MainTable
						rows={filteredRows}
						deleteRow={deleteTransaction}
						income={incomeForSelectedMonth}
					/>
				)}
			</View>

			<AddTransactionModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onAdd={handleAddTransaction}
			/>

			<SetIncomeModal
				visible={incomeModalVisible}
				onClose={() => setIncomeModalVisible(false)}
				onSave={handleSaveIncome}
				initialMonth={selectedMonth || undefined}
				initialIncome={incomeForSelectedMonth}
			/>
		</View>
	);
}
