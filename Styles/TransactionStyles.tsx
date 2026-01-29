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

	datePickerButton: {
		width: "100%",
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 12,
		paddingHorizontal: 8,
		justifyContent: "center",
	},
	datePickerText: {
		fontSize: 16,
		color: "#333",
	},
	datePickerPlaceholder: {
		color: "#999",
	},

	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	smallModalContent: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 12,
		elevation: 6,
		maxHeight: "85%",
	},
	dateModalButtonRow: {
		marginTop: 12,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	label: {
		marginRight: 8,
		fontSize: 16,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		padding: 10,
		borderRadius: 5,
	},
	cancelButton: {
		backgroundColor: "red",
		marginRight: 10,
	},
	addButton: {
		backgroundColor: "green",
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});
