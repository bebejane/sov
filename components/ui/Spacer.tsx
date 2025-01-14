import { StyleSheet, View } from "react-native";
import Theme from "@/styles/theme";

type Props = {
	size?: "small" | "medium" | "large" | "line";
};

export function Spacer({ size = "medium" }: Props) {
	return <View style={[s[size]]} />;
}

const s = StyleSheet.create({
	small: {
		height: Theme.margin,
	},
	medium: {
		height: Theme.margin,
	},
	large: {
		height: Theme.margin,
	},
	line: {
		width: "100%",
		height: Theme.borderWidth,
		backgroundColor: Theme.color.greyDark,
	},
});
