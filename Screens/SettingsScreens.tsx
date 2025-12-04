import { Text, View } from "react-native";
import { styles } from "../Styles/MainStyles";

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Asetukset</Text>
			<Text>Täällä voit muokata sovelluksen asetuksia.</Text>
		</View>
	);
}
