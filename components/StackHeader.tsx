import Theme from "@/styles/theme";
import { StyleSheet, View, Text } from "react-native";

export function StackHeader(props: any) {
	return (
		<View style={s.headerContainer}>
			<Text
				style={s.headerTitle}
				numberOfLines={1}
			>
				{props.children}
			</Text>
		</View>
	);
}

const s = StyleSheet.create({
	headerContainer: {
		display: "flex",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: Theme.fontSize.default,
		color: Theme.color.green,
		fontWeight: 600,
	},
});
