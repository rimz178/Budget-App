import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { styles } from "../Styles/MainStyles";

export default function MainScreen() {
	const [input, setInput] = useState<string>("");
	const [numbers, setNumbers] = useState<number[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const loadNumbers = async () => {
			const data = await AsyncStorage.getItem("numbers");
			if (data) {
				try {
					const parsed = JSON.parse(data);
					if (Array.isArray(parsed)) {
						setNumbers(parsed);
					}
				} catch {
					setNumbers([]);
				}
			}
		};
		loadNumbers();
	}, []);

	useEffect(() => {
		AsyncStorage.setItem("numbers", JSON.stringify(numbers));
	}, [numbers]);

	const handlePress = () => {
		setError("");
		if (input.trim() === "") {
			setError("Syötä luku!");
			return;
		}
		const num = Number(input);
		if (!Number.isNaN(num)) {
			setNumbers((prev) => [...prev, num]);
			setInput("");
		} else {
			setError("Syötä kelvollinen luku!");
		}
	};
	const deleteNumber = (index: number) => {
		setNumbers((prev) => prev.filter((_, idx) => idx !== index));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Syötä luku:</Text>
			<TextInput
				style={styles.input}
				value={input}
				onChangeText={setInput}
				placeholder="Kirjoita luku"
				keyboardType="numeric"
			/>
			<Button title="Lisää" onPress={handlePress} />
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<Text style={{ marginTop: 20, fontWeight: "bold" }}>
				Tallennetut luvut:
			</Text>
			<FlatList
				data={numbers}
				keyExtractor={(_, idx) => idx.toString()}
				renderItem={({ item, index }) => (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 5,
						}}
					>
						<Text style={{ marginRight: 10 }}>{item}</Text>
						<Button title="Poista" onPress={() => deleteNumber(index)} />
					</View>
				)}
			/>
		</View>
	);
}
