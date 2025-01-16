import { StyleSheet, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Theme from "../styles/theme";

export default () => {
	const notchHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;
	const s = StyleSheet.create({
		container: {
			backgroundColor: Theme.color.green,
			width: "100%",
			height: notchHeight,
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 1,
		},
	});

	return (
		<>
			<StatusBar
				style={"light"}
				translucent={true}
				backgroundColor={Theme.color.green}
			/>
			{Platform.OS === "ios" && <View style={s.container}></View>}
		</>
	);
};
