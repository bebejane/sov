import { StyleSheet, View as ViewElement } from "react-native";
import Theme from "@/styles/theme";

export const View = ({ children, style }: { children?: any; style?: any }) => {
	const s = StyleSheet.create({
		view: {
			flex: 1,
			flexDirection: "column",
			padding: Theme.padding,
			backgroundColor: Theme.color.white,
			width: Theme.screenWidth,
			height: Theme.screenHeight,
			...style,
		},
	});
	return <ViewElement style={s.view}>{children}</ViewElement>;
};