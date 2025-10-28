import { Button, FlatList, Text, View } from "react-native";
import { styles } from "../Styles/MainStyles";
import BudgetSummary from "./BudgetSummary";
import type { TableRow } from "./types";

type MainTableProps = {
	rows: TableRow[];
	deleteRow: (index: number) => void;
	income?: number;
};

export default function MainTable({ rows, deleteRow, income }: MainTableProps) {
	return (
		<View style={{ width: "100%" }}>
			{typeof income === "number" && (
				<BudgetSummary rows={rows} income={income} />
			)}

			<View
				style={{ flexDirection: "row", padding: 8, backgroundColor: "#eee" }}
			>
				<Text style={{ flex: 1, fontWeight: "bold" }}>Päivä</Text>
				<Text style={{ flex: 1, fontWeight: "bold" }}>Nimi</Text>
				<Text style={{ flex: 1, fontWeight: "bold" }}>Summa</Text>
				<Text style={{ flex: 1, fontWeight: "bold" }}>Lisätietoa</Text>
				<Text style={{ flex: 1, fontWeight: "bold" }}>Tyyppi</Text>
				<Text style={{ width: 60 }} />
			</View>

			<FlatList
				data={rows}
				keyExtractor={(_, idx) => idx.toString()}
				renderItem={({ item, index }) => (
					<View style={styles.listItemContainer}>
						<Text style={{ flex: 1 }}>{item.date}</Text>
						<Text style={{ flex: 1 }}>{item.title}</Text>
						<Text style={{ flex: 1 }}>
							{item.amount ? `${item.amount} €` : ""}
						</Text>
						<Text style={{ flex: 1 }}>{item.info}</Text>
						<Text
							style={{ flex: 1, color: item.type === "meno" ? "red" : "green" }}
						>
							{item.type === "meno"
								? "Meno"
								: item.type === "tulo"
									? "Tulo"
									: ""}
						</Text>
						{item.title || item.amount || item.info ? (
							<Button title="Poista" onPress={() => deleteRow(index)} />
						) : (
							<View style={{ width: 60 }} />
						)}
					</View>
				)}
			/>
		</View>
	);
}
