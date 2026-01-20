import { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { styles } from "../Styles/MainStyles";
import BudgetSummary from "./BudgetSummary";
import type { TableRow } from "./types";

type MainTableProps = {
	rows: TableRow[];
	// ennen: deleteRow: (index: number) => void;
	deleteRow: (id: string) => void;
	income?: number;
};

export default function MainTable({ rows, deleteRow, income }: MainTableProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const filteredRows = selectedDate
		? rows.filter((row) => row.date === selectedDate.toISOString().slice(0, 10))
		: rows;

	return (
		<FlatList
			data={filteredRows}
			keyExtractor={(item, idx) =>
				item.id ?? `row-${item.date ?? ""}-${item.title ?? ""}-${idx}`
			}
			ListHeaderComponent={
				<View>
					{selectedDate && (
						<Button
							title="Näytä kaikki"
							onPress={() => setSelectedDate(null)}
						/>
					)}

					{typeof income === "number" && (
						<BudgetSummary rows={filteredRows} income={income} />
					)}
					<View
						style={{
							flexDirection: "row",
							padding: 8,
							backgroundColor: "#eee",
						}}
					>
						<Text style={{ flex: 1, fontWeight: "bold" }}>Päivä</Text>
						<Text style={{ flex: 1, fontWeight: "bold" }}>Nimi</Text>
						<Text style={{ flex: 1, fontWeight: "bold" }}>Summa</Text>
						<Text style={{ flex: 1, fontWeight: "bold" }}>Lisätietoa</Text>
						<Text style={{ flex: 1, fontWeight: "bold" }}>Tyyppi</Text>
						<Text style={{ width: 60 }} />
					</View>
				</View>
			}
			renderItem={({ item }) => (
				<View style={styles.listItemContainer}>
					<Text style={{ flex: 1 }}>
						{item.date ? new Date(item.date).toLocaleDateString("fi-FI") : ""}
					</Text>
					<Text style={{ flex: 1 }}>{item.title}</Text>
					<Text style={{ flex: 1 }}>
						{item.amount ? `${item.amount} €` : ""}
					</Text>
					<Text style={{ flex: 1 }}>{item.info}</Text>
					<Text
						style={{
							flex: 1,
							color: item.type === "meno" ? "red" : "green",
						}}
					>
						{item.type === "meno" ? "Meno" : item.type === "tulo" ? "Tulo" : ""}
					</Text>
					{(item.title || item.amount || item.info) && (
						<Button title="Poista" onPress={() => deleteRow(item.id)} />
					)}
				</View>
			)}
			ListEmptyComponent={
				<Text
					style={{ textAlign: "center", marginVertical: 16, color: "#666" }}
				>
					Ei tapahtumia
				</Text>
			}
		/>
	);
}
