import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name='index'
					options={{
						drawerLabel: "Hem",
						title: "Hem",
					}}
				/>
				<Drawer.Screen
					name='valued-direction/index'
					options={{
						drawerLabel: "Värderad riktning med mål",
						title: "Värderad riktning med mål",
					}}
				/>
				<Drawer.Screen
					name='take-care-of-myself/index'
					options={{
						drawerLabel: "Ta hand om mig",
						title: "Ta hand om mig",
					}}
				/>
				<Drawer.Screen
					name='home-assignment/index'
					options={{
						drawerLabel: "Hemmauppgift",
						title: "Hemmeuppgift",
					}}
				/>
				<Drawer.Screen
					name='assess-violence/index'
					options={{
						drawerLabel: "Skatta våld",
						title: "Skatta våld",
					}}
				/>
				<Drawer.Screen
					name='sork/index'
					options={{
						drawerLabel: "Sork",
						title: "Sork",
					}}
				/>
				<Drawer.Screen
					name='emotional-diary/index'
					options={{
						drawerLabel: "Enkel känslodagbok",
						title: "Enkel känslodagbok",
					}}
				/>
				<Drawer.Screen
					name='sound-exercises/index'
					options={{
						drawerLabel: "Ljudövningar",
						title: "Ljudövningar",
					}}
				/>
				<Drawer.Screen
					name='maintenance-plan/index'
					options={{
						drawerLabel: "Vidmakthållandeplan",
						title: "Vidmakthållandeplan",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
