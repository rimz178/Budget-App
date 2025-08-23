import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	label: {
		marginBottom: 8,
		fontSize: 16,
	},
	input: {
		width: 200,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 12,
		paddingHorizontal: 8,
		fontSize: 16,
	},
	error: {
		color: "red",
		marginTop: 8,
		marginBottom: 8,
	},
	// Uudet tyylit
	title: {
		marginTop: 20,
		fontWeight: "bold",
	},
	listItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 5,
	},
	listItemText: {
		marginRight: 10,
	},
});
