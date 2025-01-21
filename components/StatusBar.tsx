import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Theme from "@/styles/theme";

export default () => {
	const notchHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

	const s = StyleSheet.create({
		container: {
			backgroundColor: Theme.color.green,
			width: "100%",
			height: notchHeight,
			position: "absolute",
			margin: 0,
			padding: 0,
			top: 0,
			left: 0,
			zIndex: 1,
		},
	});

	return (
		<>
			<StatusBar
				style={"light"}
				backgroundColor={Theme.color.green}
			/>
			{Platform.OS === "ios" && <SafeAreaView style={s.container} />}
		</>
	);
};
