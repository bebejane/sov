import { StyleSheet } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const Header = ({
	children,
	size = "medium",
	margin = "medium",
}: {
	children: any;
	size: "small" | "medium";
	margin: "small" | "medium" | "large";
}) => {
	return <Text style={[s.text, s[size], s[`${margin}Margin`]]}>{children}</Text>;
};

const s = StyleSheet.create({
	text: {
		fontSize: Theme.fontSize.default,
		fontWeight: "bold",
	},
	small: {
		fontSize: Theme.fontSize.small,
	},
	medium: {
		fontSize: Theme.fontSize.default,
	},
	smallMargin: {
		marginBottom: Theme.margin / 2,
	},
	mediumMargin: {
		marginBottom: Theme.margin,
	},
	largeMargin: {
		marginBottom: Theme.margin * 3,
	},
});
