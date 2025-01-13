import { StyleSheet, ScrollView as ScrollViewElement } from "react-native";
import Theme from "@/styles/theme";

export const PageScrollView = ({ children, style }: { children?: any; style?: any }) => {
	return <ScrollViewElement style={[s.view, style]}>{children}</ScrollViewElement>;
};

const s = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: "column",
		padding: Theme.padding,
		backgroundColor: Theme.color.white,
		width: Theme.screenWidth,
		height: Theme.screenHeight,
	},
});
