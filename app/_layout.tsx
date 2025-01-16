import Navigation from "../navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Theme from "../styles/theme";

export default function Layout() {
	return (
		<>
			<Navigation />
			<SafeAreaView>
				<StatusBar
					backgroundColor={Theme.color.green}
					translucent={false}
					hidden={false}
					style='dark'
				/>
			</SafeAreaView>
		</>
	);
}
