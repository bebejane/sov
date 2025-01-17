import { StyleSheet, ScrollView as ScrollViewElement } from "react-native";
import Theme from "@/styles/theme";
import StatusBar from "../StatusBar";

export const PageView = ({ children, style }: { children?: any; style?: any }) => {
	return <ScrollViewElement style={[s.view, style]}>{children}</ScrollViewElement>;
};

const s = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: "column",
		padding: Theme.padding,
		marginBottom: Theme.padding * 2,
		backgroundColor: Theme.color.white,
		width: Theme.screenWidth,
		height: Theme.screenHeight,
	},
});
