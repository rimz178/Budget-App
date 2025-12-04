import { Text, View } from "react-native";
import type { TableRow } from "./types";

type Props = {
	rows: TableRow[];
	income?: number;
};

export function calculateTotals(rows: TableRow[]) {
	const totalIncomes = rows
		.filter((r) => r.type === "tulo")
		.reduce((s, r) => s + (r.amount || 0), 0);
	const totalExpenses = rows
		.filter((r) => r.type === "meno")
		.reduce((s, r) => s + (r.amount || 0), 0);
	return { totalIncomes, totalExpenses, net: totalIncomes - totalExpenses };
}

export default function BudgetSummary({ rows, income }: Props) {
	const { totalIncomes, totalExpenses } = calculateTotals(rows);
	const baseIncome = Number(income || 0);
	const remaining = baseIncome + totalIncomes - totalExpenses;

	return (
		<View
			style={{
				padding: 8,
				marginBottom: 8,
				backgroundColor: "#fafafa",
				borderRadius: 6,
			}}
		>
			<Text style={{ fontWeight: "bold" }}>Kuukausitulo: {baseIncome} €</Text>
			{totalIncomes > 0 && (
				<Text style={{ color: "green" }}>Lisätulot: +{totalIncomes} €</Text>
			)}
			<Text style={{ color: "#666" }}>Menot yhteensä: {totalExpenses} €</Text>
			<Text style={{ color: remaining < 0 ? "red" : "green" }}>
				Jäljellä: {remaining} €
			</Text>
		</View>
	);
}
