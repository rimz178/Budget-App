import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 12,
		paddingHorizontal: 8,
		fontSize: 16,
	},
	infoText: {
		marginBottom: 12,
		fontSize: 16,
		textAlign: "center",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
