import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName: keyof typeof Ionicons.glyphMap = "home";
					
					if (route.name === "index") {
						iconName = "home";
					} else if (route.name === "Settings") {
						iconName = "settings";
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tabs.Screen name="index" options={{ title: "Koti" }} />
			<Tabs.Screen name="Settings" options={{ title: "Asetukset" }} />
		</Tabs>
	);
}
