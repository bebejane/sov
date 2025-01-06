import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name='index'
					options={{
						drawerLabel: "Home",
						title: "Home",
					}}
				/>
				<Drawer.Screen
					name='valued-direction/index'
					options={{
						drawerLabel: "Värderad riktning med mål",
						title: "Värderad riktning med mål",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
