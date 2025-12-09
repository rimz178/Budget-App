import { useState } from "react";
import { Button, Text, View } from "react-native";
import AddTransactionModal from "../components/AddTransactionModal";
import MainTable from "../components/MainTable";
import MonthSelector from "../components/MontSelector";
import SetIncomeModal from "../components/SetIncomeModal";
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
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

	// Päivitetään kuukausitulo valitun kuukauden mukaan
	const incomeForSelectedMonth = selectedMonth
		? monthlyIncomes.find((mi) => mi.month === selectedMonth)?.income || 0
		: 0;

	// Suodatetaan tapahtumat valitun kuukauden mukaan
	const filteredRows = selectedMonth
		? rows.filter((row) => row.date?.startsWith(selectedMonth))
		: rows;

	const handleSaveIncome = (month: string, income: number) => {
		saveIncome(month, income);
		setSelectedMonth(month); // Asetetaan valittu kuukausi
		setIncomeModalVisible(false); // Suljetaan modal
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Budjetti</Text>

			{/* Kuukauden valinta */}
			<MonthSelector
				onMonthChange={(month) => setSelectedMonth(month)}
				initialMonth={selectedMonth || undefined}
			/>
			{selectedMonth && (
				<Text style={styles.infoText}>
					Valittu kuukausi:{" "}
					{new Date(selectedMonth).toLocaleDateString("fi-FI", {
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
				onAdd={addTransaction}
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
