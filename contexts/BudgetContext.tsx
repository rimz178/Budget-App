import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import type { TableRow } from "../components/types";

type MonthlyIncome = {
	month: string;
	income: number;
};

type BudgetContextType = {
	rows: TableRow[];
	monthlyIncomes: MonthlyIncome[];
	addTransaction: (row: TableRow) => void;
	saveIncome: (month: string, income: number) => void;
	deleteTransaction: (index: number) => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
	const context = useContext(BudgetContext);
	if (!context) {
		throw new Error("useBudget must be used within a BudgetProvider");
	}
	return context;
};

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
	const [rows, setRows] = useState<TableRow[]>([]);
	const [monthlyIncomes, setMonthlyIncomes] = useState<MonthlyIncome[]>([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const json = await AsyncStorage.getItem("@budget_data");
				if (json) {
					const parsed = JSON.parse(json);
					if (Array.isArray(parsed.rows)) setRows(parsed.rows);
					if (Array.isArray(parsed.monthlyIncomes))
						setMonthlyIncomes(parsed.monthlyIncomes);
				}
			} catch (e) {
				console.error("Error loading data", e);
			}
		};
		loadData();
	}, []);

	const storeData = async (
		nextRows: TableRow[],
		nextMonthlyIncomes: MonthlyIncome[],
	) => {
		try {
			const jsonValue = JSON.stringify({
				rows: nextRows,
				monthlyIncomes: nextMonthlyIncomes,
			});
			await AsyncStorage.setItem("@budget_data", jsonValue);
		} catch (e) {
			console.error("Error saving data", e);
		}
	};

	const saveIncome = (month: string, income: number) => {
		const updatedIncomes = [
			...monthlyIncomes.filter((mi) => mi.month !== month),
			{ month, income },
		];
		setMonthlyIncomes(updatedIncomes);
		storeData(rows, updatedIncomes);
	};

	return (
		<BudgetContext.Provider
			value={{
				rows,
				monthlyIncomes,
				addTransaction: (row) => {
					const updatedRows = [...rows, row];
					setRows(updatedRows);
					storeData(updatedRows, monthlyIncomes);
				},
				saveIncome,
				deleteTransaction: (index) => {
					const updatedRows = rows.filter((_, idx) => idx !== index);
					setRows(updatedRows);
					storeData(updatedRows, monthlyIncomes);
				},
			}}
		>
			{children}
		</BudgetContext.Provider>
	);
};
