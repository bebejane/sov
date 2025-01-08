import { StyleSheet, View as ViewElement } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const Loader = ({ loading }: { loading: boolean }) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.white,
			fontSize: Theme.fontSize.default,
		},
		view: {
			flex: 1,
			top: 0,
			left: 0,
			zIndex: 10,
			justifyContent: "center",
			alignItems: "center",
			width: Theme.screenWidth,
			height: Theme.screenHeight,
		},
	});
	return (
		<ViewElement style={s.view}>
			<Text>Loading...</Text>
		</ViewElement>
	);
};
